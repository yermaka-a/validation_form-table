import { z } from 'zod'
import { ageMustBePositiveInteger, fieldMustBefill, fioMustHaveOnlyLettersAndBeSeparatedBySpaces, incorrectEmailAddress, passMustBeMoreSixSymbols, passMustnotHaveSpaces } from '~/constants/validationErrorMessages'

 const schema = z.object({
  email: z.string().min(1, {message: fieldMustBefill}).email({ message: incorrectEmailAddress }),
  password: z.string().min(6, { message: passMustBeMoreSixSymbols }).refine((val) => !/\s/.test(val), {
        message: passMustnotHaveSpaces,
    }),
  age:  z.string().min(1, {message: fieldMustBefill}).refine((val)=> 0 < Number(val) && Number(val), {message: ageMustBePositiveInteger}),
  fio: z.string().min(1, { message: fieldMustBefill}).trim().toLowerCase()
    .regex(/^[а-яё]+\s+[а-яё]+\s+[а-яё]+$/, {
        message: fioMustHaveOnlyLettersAndBeSeparatedBySpaces,
    })
    .transform((val) => {
        return val.split(' ').filter((val)=> val !== "")
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
    }),
  sex: z.string().min(1, {message: fieldMustBefill}).max(1, {message: fieldMustBefill}),
})
export default schema