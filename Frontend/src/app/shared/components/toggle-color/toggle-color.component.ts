import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toggle-color',
  templateUrl: './toggle-color.component.html',
  styleUrls: ['./toggle-color.component.scss']
})
export class ToggleColorComponent implements OnInit {
  
  public colorMode:string| null;
  constructor() {
     // Obtenemos el color almacenado
    this.colorMode = localStorage.getItem('color_mode');
  }

  ngOnInit(): void {
    // Si no existe almacenamos claro por defecto
    if(!this.colorMode){
      this.colorMode = 'light';
      localStorage.setItem('color_mode', 'light');
    }
    
    // Se envia a activar el css
    this.checkMode();
  }

  /**
   * Este metodo cambia el color actual por el contrario.
   */
  public toggleColor(){
    this.colorMode =  this.colorMode ==="dark" ? "light" : "dark"
    localStorage.setItem('color_mode', this.colorMode|| "ligth");
    this.checkMode();
  }

  /**
   * Este metodo revisa el color actual para asignarlo al body.
   */
  private checkMode(){
    if(this.colorMode === "dark"){
      document.body.classList.remove("light")
    }else{
      document.body.classList.add("light")
    }
  }

}