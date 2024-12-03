
import { IWidgetProps } from '@/shared/types';
import { ListClient } from './ListClient';

function List(props: IWidgetProps) {
    return (
        <ListClient {...props} />
    );
}

List.displayName = "List";
export default List;

