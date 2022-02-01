import { MetaFunction, json, LoaderFunction, useLoaderData, redirect } from 'remix'

type User = {
    username: string;
    first: string;
    last: string;
}

export const meta: MetaFunction = ({ data }: { data: User }) => {
    const formatName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)
    return {
        title: `${formatName(data.username)}'s Profile Page`
    }
}

export let loader: LoaderFunction = async ({ params }) => {
    const users: User[] = [
        {
            username: 'sabinthedev',
            first: 'Sabin',
            last: 'Adams'
        },
        {
            username: 'leeland',
            first: 'Leeland',
            last: 'Adams'
        }
    ]

    const user = users.find(user => user.username === params.username)

    if (!user) {
        throw new Response('Not Found', {
            status: 404
        })
    }
    return json(user)
}

export default function Profile() {
    const user = useLoaderData()

    return (
        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <h2>{ user.first }</h2>
        </div>
    );
}
