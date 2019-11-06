# Cpf Cnpj validator


```go
import { AbstractControl } from "@angular/forms";
```

And then just import the package into your own code.

```go
	import { CpfCnpjValidator } from "cpf-cnpj.validator";
```

# Usage

```go
	const form = this.formBuilder.group({
        cpf: [null, [Validators.required, CpfCnpjValidator]]
    })
```
