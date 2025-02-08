/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";


export const createStartUp = async (state: any, form: FormData, pitch: string) => {
    const session = <any>await auth();
    if (!session) return parseServerActionResponse({ error: "Not Authorised", status: "Error" })
    const { title, description, category, image } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
    )
    try {
        const startup = {
            title, description, category, image, author: session?.id, pitch
        }
        const requestOptions = {
            method: "POST", // Specify the request method
            headers: { "Content-Type": "application/json" }, // Specify the content type
            body: JSON.stringify(startup) // Send the data in JSON format
        };
        const result = await fetch(`http://localhost:8000/api/v1/startup`, requestOptions)
        const finalresult = await result.json()
        return parseServerActionResponse({ ...finalresult, error: "", status: "SUCCESS" })
    } catch (error) {
        console.log(error)
        return parseServerActionResponse({ error: JSON.stringify(error), status: 'Error' })
    }

}