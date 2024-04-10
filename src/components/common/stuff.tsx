'use client';

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Search from '@/lib/search';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

function Stuff() {
    const [seeDetail, setSeeDetail] = useState(false);

    const [height, setHeight] = useState(0);
    const [movesArray, setMovesArray] = useState([]);
    const [abilities, setAbilities] = useState([]);


    const FormSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "clefairy",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setSeeDetail(false);
        const detail = await Search(data.username);
        const de = await detail.json();
        let hh = (de.height / 3.048).toFixed(2);
        setHeight(hh);
        setMovesArray(de.movesArray);
        setAbilities(de.abilities);
        console.log(de);
        setSeeDetail(true);
    }

    return (
        <div>
            <div className='border border-slate-500 p-5 rounded-xl w-fit mb-3'>
                <div className='text-2xl text-slate-300'>Search for your Pokemon character.</div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="clefair" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            We will search based on above name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
            </div>

            {seeDetail && 
            <div>
                <div className='text-xl font-bold'>
                    Height: 
                    <span className='font-normal ml-4'>{height} ft</span>
                </div>

                <div className=' text-xl font-bold'>
                    Moves: 
                    <span>
                        { movesArray.map((move, index)=>
                        <span key={index} className='ml-4 text-lg font-normal'>{move}</span>)}
                    </span>
                </div>

                <div className='mt-9 text-2xl font-bold mb-4'>Abilites: <span>{abilities.map((ability, index)=>
                <div key={index}>
                    <div >{ability.name}</div>
                    <div className='text-sm font-normal mb-6'>{ability.describe}</div>
                    </div>
                    
                    )}</span></div>
            </div>}
        </div>
    )
}

export default Stuff;