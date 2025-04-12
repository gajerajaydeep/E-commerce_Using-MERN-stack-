import React from 'react'
import { Label } from '../ui/label'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
  } from "@/components/ui/select";
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Input } from '../ui/input';



// form is define here : src > config > index > 
export default function CommanForm({ formControls, formData, setFormData, onSubmit, buttonText,isBtnDisabled }) {

    function renderInputByComponentType(getControlItem) {
        let element = null;
// form data value
const value = formData[getControlItem.name] || ''


        switch (getControlItem.componentType) {
            case 'input':
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getControlItem.name] : event.target.value
                        })}
                    />
                );
                break;
            case 'select':
                element = (
                    <Select
                    onValueChange={(selectedValue) => setFormData({
                        ...formData,
                        [getControlItem.name]: selectedValue,
                     })} 
                     value={value || undefined}
                     >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.label} />
                        </SelectTrigger>
                        {/* select option like country list dropdown */}
                        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 shadow-lg rounded-md">
                            {
                                (getControlItem.options &&
                                    getControlItem.options.length > 0)
                                    ?
                                    getControlItem.options.map((optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>))
                                    :
                                    null
                            }
                        </SelectContent>

                    </Select>
                );
                break;

            case 'textarea':
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
             onChange={event => setFormData({
                            ...formData,
                            [getControlItem.name] : event.target.value
                        })}
                    />
                );
                break;

            default:
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [getControlItem.name] : event.target.value
                        })}
                    />
                );
                break;
        }
        return element
    }
    return (
        <>

            <form onSubmit={onSubmit}>
                <div className='flex flex-col gap-3'>
                    {
                        formControls.map((controlItem) => (<div className='grid w-full gap-1.5' key={controlItem.name}>
                            <Label className='mb-1'>{controlItem.label}</Label>
                            {
                                renderInputByComponentType(controlItem)
                            }
                        </div>
                        ))}
                </div>
                <Button disabled={isBtnDisabled} type="submit" className="mt-2 bg-slate-600 text-white w-full">{buttonText || 'submit'}</Button>
            </form>
        </>
    )
}
