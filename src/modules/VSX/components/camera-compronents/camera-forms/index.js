import  FormEtap from './formEtap'
import  FormAdvakat from './formAdvakat'
import  FormOther from './formOther'
import  FormFood from './formFood'
import  FormInquest from './formInquest'
import  FormSayirga from './formSayirga'
import  FormRelease from './formRelease'
import  FormSpecially from './formSpecially'

export const returnForms =  (id, customData, method) => {
    console.log(id)
    let forms = {
        "1": <FormSayirga customData={customData} method={method}/>,
        "2": <FormFood customData={customData} method={method}/>,
        "3": <FormInquest customData={customData} method={method}/>,
        "4": <FormSpecially customData={customData} method={method}/> ,
        "5": <FormAdvakat customData={customData} method={method}/> ,
        "6": <FormEtap customData={customData} method={method}/> ,
        "7": <FormRelease customData={customData} method={method}/>,
        "8": <FormOther customData={customData} method={method}/>
    }
    return forms[id]
}
