import { AbstractControl } from '@angular/forms';

export function CpfCnpjValidator(control: AbstractControl): {[key: string]: any} | null {
    if (control.value == null) {
      return { empty: true };
    }

    const cpfLength = 11;
    const cnpjLength = 14;
    const cpfCnpj = control.value.replace(/\D/g, '');

    const buildDigit = function(arr: number[]): number {

      const isCpf = arr.length < cpfLength;
      const digit = arr
              .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
              .reduce((total, current) => total + current) % cpfLength;

      if (digit < 2 && isCpf) {
          return 0;
      }
      return cpfLength - digit;
    };

    // Tamanho da string
    if ([cpfLength, cnpjLength].indexOf(cpfCnpj.length) < 0) {
        return { cpfLength: true };
    }

    // Digitos repetidos
    if (/^([0-9])\1*$/.test(cpfCnpj)) {
        return { cpfInvalido: true };
    }

    // Calculo para verificar CPF/CNPJ
    const cpfCnpjArr: number[] = cpfCnpj.split('').reverse().slice(2);

    cpfCnpjArr.unshift(buildDigit(cpfCnpjArr));
    cpfCnpjArr.unshift(buildDigit(cpfCnpjArr));


    if (cpfCnpj !== cpfCnpjArr.reverse().join('')) {
        return { cpfInvalido: true };
    }

    return null;
}
