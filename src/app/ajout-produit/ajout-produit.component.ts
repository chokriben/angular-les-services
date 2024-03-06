import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/produit';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  produits: Produit[] = [];
  nouveauProduit: Produit = new Produit();

  constructor(private produitsService: ProduitsService) {}

  message: string = '';

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits(): void {
    this.produitsService.getProduits().subscribe({
      next: (produits) => {
        this.produits = produits;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des produits.", err);
      }
    });
  }

  ajouterProduit() {
    this.produitsService.addProduit(this.nouveauProduit).subscribe({
      next: (response) => {
        this.produits.push(response);
        this.message = 'Le produit a été ajouté avec succès.';
        this.effacerSaisie(); // Appel de la méthode pour effacer la saisie
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du produit.", err);
        this.message = "Erreur lors de l'ajout du produit.";
      },
    });
  }

  validerFormulaire() {
    // Vérifie si l'id du nouveau produit est déjà existant
    const idExist = this.produits.some(prod => prod.id === this.nouveauProduit.id);
    if (idExist) {
      alert("Identificateur de produit déjà existant.");
    } else {
      // Si l'id n'existe pas déjà, ajoute le produit
      this.ajouterProduit();
    }
  }

  effacerSaisie() {
    // Cette méthode sera appelée pour effacer la saisie après l'ajout d'un produit
    this.nouveauProduit = new Produit(); // Réinitialisation de l'objet nouveauProduit
  }
}
