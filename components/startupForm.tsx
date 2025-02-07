/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
const StartupForm = () => {

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("");
    const [file, setFile] = useState()
    const { toast } = useToast()
    const router = useRouter()
    const handleformSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                image: file,
                pitch
            }
            await formSchema.parseAsync(formValues);
            // const result = await createIdea(prevState, formData, pitch)
            // console.log(formValues)

            // const newformData = new FormData();
            // newformData.append("title", formValues.title)
            // newformData.append("description", formValues.description)
            // newformData.append("category", formValues.category)
            // newformData.append("image",file)
            // newformData.append("pitch",pitch)
            // console.log(newformData)
            const requestOptions = {
                method: "POST", // Specify the request method
                headers: { "Content-Type": "application/json" }, // Specify the content type
                body: JSON.stringify(formValues) // Send the data in JSON format
            };
            const result = await fetch(`http://localhost:8000/api/v1/startup`, requestOptions)
            const finalresult = await result.json()
            if (finalresult?.message === "Success") {
                toast({
                    title: "Success",
                    description: "Your statup is successfully added"
                })
                router.push(`/startup/${finalresult?.newstartUp?._id}`)
            }
            // return finalresult
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);
                toast({
                    title: "Error",
                    description: "Please Check your inputs and try again",
                    variant: "destructive"
                })
                return { ...prevState, error: "Validation failed", status: "Error" }
            }
            toast({
                title: "Error",
                description: "an expected Error occured ",
                variant: "destructive"
            })
            return { ...prevState, error: "An Expected error has occured", status: "Error" }
        }

    }

    function handleChange(event: any) {
        setFile(event.target.files[0])
    }
    const [state, formAction, isPending] = useActionState(handleformSubmit, { error: "", status: "INITIAL" });

    return (
        <form action={formAction} className='startup-form'>
            <div>
                <label htmlFor="title" className="startup-form_label">Title</label>
                <Input className="startup-form_input" id="title" name="title" required placeholder='StartUp Title'></Input>
                {errors?.title && <p className='startup-form_error'>{errors?.title}</p>}
            </div>
            <div>
                <label htmlFor="description" className="startup-form_label">Description</label>
                <Textarea className="startup-form_textarea" id="description" name="description" required placeholder='StartUp description'></Textarea>
                {errors?.description && <p className='startup-form_error'>{errors?.description}</p>}
            </div>
            <div>
                <label htmlFor="category" className="startup-form_label">category</label>
                <Input className="startup-form_input" id="category" name="category" required placeholder='StartUp category'></Input>
                {errors?.category && <p className='startup-form_error'>{errors?.category}</p>}
            </div>
            <div>
                <label htmlFor="link" className="startup-form_label">link</label>
                <Input type="file" onChange={handleChange} className="startup-form_input flex items-center justify-center" id="image" name="image" required placeholder='StartUp image'></Input>
                {errors?.link && <p className='startup-form_error'>{errors?.link}</p>}
            </div>
            <div data-color-mode='light'>
                <label htmlFor="Pitch" className="startup-form_label">Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id='pitch'
                    preview='edit'
                    height={300}
                    style={{ border: 20, overflow: 'hidden' }}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves"
                    }}
                    previewOptions={{
                        disallowedElements: ['style']
                    }}
                />
                {errors?.pitch && <p className='startup-form_error'>{errors?.pitch}</p>}
            </div>
            <Button type="submit" className='startup-form_btn text-white ' disabled={isPending}>{isPending ? "Submiting ..." : "Submit your startUp"}
                <Send className='size-6 ml-2' />
            </Button>

        </form>
    )
}

export default StartupForm