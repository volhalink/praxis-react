import {DateTime} from 'luxon';
import {Timezone} from '../contexts/user-context';
import Select from './utils/Select';

interface TimezoneSelctorProps {
    initialTimezone: string,
    select: (t: string) => void
}

function TimezoneSelctor(props: TimezoneSelctorProps) {
    const {initialTimezone , select} = props;
    const timezones = ((Intl as any).supportedValuesOf('timeZone') as string[])
    .reduce((memo: Timezone[], tz) => {
        memo.push({
        name: tz,
        offset: DateTime.local({ zone: tz }).offset
        });
        
        return memo;
    }, [])
    .sort((a, b) => {
        return a.offset - b.offset
    });

    const options = timezones.map(tz => {
        const secondLabel = tz.offset ? `GMT${DateTime.local({ zone: tz.name }).toFormat('Z')}` : null;
        return { value: tz.name, label: tz.name, secondLabel: secondLabel};
    });

    return(
        <div>
            <Select initialLabel={initialTimezone} options={options} select={select} />
        </div>
    );
}

export default TimezoneSelctor;