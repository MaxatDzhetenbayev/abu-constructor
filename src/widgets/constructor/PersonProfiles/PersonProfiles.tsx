import { IWidgetProps } from '@/shared/types'
import React from 'react'
import { ProfileCard } from './ui/ProfileCard/ProfileCard';
import { Heading } from '@/shared/ui';

function PersonProfiles({
    contents,
    options: { content },
    locale,
}: IWidgetProps) {
    return (
        <section className='flex flex-col gap-3'>
            <Heading >
                {content[locale].title}
            </Heading>
            <ul className='grid grid-cols-[repeat(auto-fill,minmax(310px,_1fr))] gap-5 justify-center'>
                {
                    contents.map(({ content }, idx) => (
                        <ProfileCard key={idx} content={content} locale={locale} />
                    ))
                }
            </ul>
        </section>
    )
}

PersonProfiles.displayName = "PersonProfiles";
export default PersonProfiles;