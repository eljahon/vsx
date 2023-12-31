import  FormEtap from './formEtap'
import  FormAdvakat from './formAdvakat'
import  FormOther from './formOther'
import  FormFood from './formFood'
import  FormInquest from './formInquest'
import  FormSayirga from './formSayirga'
import  FormRelease from './formRelease'
import  FormSpecially from './formSpecially'

export const returnForms =  (id, customData, method, title) => {
    let forms = {
        "1": <FormSayirga customData={customData} method={method} title={title}/>,
        "2": <FormFood customData={customData} method={method} title={title}/>,
        "3": <FormInquest customData={customData} method={method} title={title}/>,
        "4": <FormSpecially customData={customData} method={method} title={title}/> ,
        "5": <FormAdvakat customData={customData} method={method} title={title}/> ,
        "6": <FormEtap customData={customData} method={method} title={title}/> ,
        "7": <FormRelease customData={customData} method={method} title={title}/>,
        "8": <FormOther customData={customData} method={method} title={title}/>
    }
    return forms[id]
}
