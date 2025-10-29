import { Component, inject, OnInit, signal } from '@angular/core';
import { AzotBlock } from '../../components';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IAzot } from '../../../../core/interfaces/azot';
import { Azot, Counter, Telegram } from '../../../../core';
import { NumberPipe } from '../../../../pipe';

@Component({
	selector: 'app-azots',
	imports: [
		AzotBlock,
		RouterLink,
		AsyncPipe,
		RouterLinkActive,
		NumberPipe,
	],
	templateUrl: './azots.html',
	styleUrl: './azots.scss',
})
export class Azots implements OnInit {
	private azotsService = inject(Azot);
	protected counter = inject(Counter);
	private telegram = inject(Telegram);
	constructor(private router: Router) { }

	protected azotInfo = signal<IAzot['data'] | null>(null);
	protected liters$ = this.azotsService.liters.asObservable();

	async ngOnInit(): Promise<void> {
		await firstValueFrom(this.azotsService.getAzots()).then((res) => {
			this.router.navigate([], {
				queryParams: { liter: res.data.data[0].id },
			});
			this.selectAzot(res.data.data[0].id);
		});
	}
	protected async selectAzot(id: number): Promise<void> {
		await firstValueFrom(this.azotsService.getAzotInfo(id)).then((res) => {
			this.azotInfo.set(res.data);
		});
	}

	protected async kupit(
		product_id: number,
		product_typ_id: number
	): Promise<void> {
		const tg_id = (await this.telegram.getTgUser()).user.id.toString();
		await firstValueFrom(
			this.azotsService.kupit(tg_id, product_id, product_typ_id)
		);
	}

	protected async minus(
		product_id: number,
		product_type_id: number
	): Promise<void> {
		const tg_id = (await this.telegram.getTgUser()).user.id.toString();
		await firstValueFrom(
			this.azotsService.minus(tg_id, product_id, product_type_id)
		).then(() => {
			this.counter.isCounted(product_type_id);
		});
	}
}
