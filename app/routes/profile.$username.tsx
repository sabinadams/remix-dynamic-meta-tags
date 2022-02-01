import { 
    json,
    LoaderFunction,
    useLoaderData,
    MetaFunction
} from 'remix'

type User = {
    username: string;
    first: string;
    last: string;
}

export const meta: MetaFunction = ({ data }: { data: User }) => {
    const formatName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)
    return {
      title: `${formatName(data.username)}'s Profile Page`,
      'twitter:card': 'summary_large_image',
      'twitter:creator': `@${data.username}`,
      'twitter:site': `@${data.username}`,
      'twitter:title': `${data.first} ${data.last}`,
      'twitter:description': `${data.first} ${data.last}'s profile page. Check it out @${data.username}`
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
        <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', background: '#0c0f12' }}>
            <h2 style={{ flex: 1, textAlign: 'center', color: '#f1f1f1', fontFamily: 'system-ui' }}>{user.first} {user.last}</h2>
        </div>
    );
}
