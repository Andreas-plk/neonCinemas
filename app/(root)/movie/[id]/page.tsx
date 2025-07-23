import React from 'react'

const Page = async  ({params}:{params:Promise<{ id: number }>}) => {
    const id=(await params).id;
    return (
        <div>movie {id}</div>
    )
}
export default Page
