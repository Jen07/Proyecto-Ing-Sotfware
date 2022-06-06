import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'legalResponse',
})
export class LegalResponsePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 1:
        return "Resuelto"
      case 2:
        return "Pendiente"
      case 3:
        return "Ampliado"

      default:
        return "Unknown"
    }
  }
}
