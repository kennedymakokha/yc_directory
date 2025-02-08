
import {z} from  'zod';

export const formSchema = z.object({
    title:z.string(),
    description:z.string(),
    category:z.string(),
    // image:z.string().min(3).max(100)
    pitch:z.string().min(10)
})