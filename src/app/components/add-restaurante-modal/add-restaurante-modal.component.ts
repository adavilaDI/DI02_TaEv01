import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Restaurante } from '../../interface/restaurante';
import { RestauranteService } from '../../services/restaurante.service';

import {closeCircleOutline} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-add-restaurante-modal',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  templateUrl: './add-restaurante-modal.component.html',
})
export class AddRestauranteModalComponent {
  //Se añaden los iconos en el constructor
    constructor() {
      addIcons({ closeCircleOutline });
    }

  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  private toastCtrl = inject(ToastController);
  private restauranteService = inject(RestauranteService);

  guardando = signal(false);

  //Se añade validación para los mínimos y máximos de estrellas y soles sin que sean obligatorios
  form = this.fb.nonNullable.group({
    documentName: ['', Validators.required],
    territory:    ['', Validators.required],
    locality:     [''],
    address:      [''],
    phone:        [''],
    web:          [''],
    michelinStar: ['0', [Validators.minLength(0), Validators.maxLength(3)]],
    repsolSun:    ['0', [Validators.minLength(0), Validators.maxLength(3)]],
  });

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando.set(true);
    try {
      const restaurante: Restaurante = {
        ...this.form.getRawValue(),
        documentDescription: '',
        templateType: '',
        localityQ: '',
        qualityQ: '',
        qualityIconDescription: '',
        accesibility: '',
        accesibilityIconDescription: '',
        marks: '',
        physical: '',
        visual: '',
        auditive: '',
        intellectual: '',
        organic: '',
        qualityAssurance: '',
        tourismEmail: '',
        importance: '',
        room: '',
        productClub: '',
        visit: '',
        capacity: '',
        store: '',
        gastronomical: '',
        surfing: '',
        postalCode: '',
        restorationType: '',
        recomended: '',
        recomendedURLIcon: '',
        recomendedIconDescription: '',
        restaurant: '',
        bodega: '',
        latitudelongitude: '',
        latwgs84: '',
        lonwgs84: '',
        placename: '',
        municipality: '',
        municipalitycode: '',
        postalcode: '',
        territorycode: '',
        country: '',
        countrycode: '',
        email: '',
        webpage: '',
        friendlyUrl: '',
        physicalUrl: '',
        dataXML: '',
        metadataXML: '',
        zipFile: '',
      };
      await this.restauranteService.add(restaurante);
      await this.modalCtrl.dismiss(restaurante, 'confirm');
    } catch {
      const toast = await this.toastCtrl.create({
        message: 'Error al guardar el restaurante en Firebase',
        duration: 3000,
        color: 'danger',
        position: 'bottom',
      });
      await toast.present();
    } finally {
      this.guardando.set(false);
    }
  }
}
