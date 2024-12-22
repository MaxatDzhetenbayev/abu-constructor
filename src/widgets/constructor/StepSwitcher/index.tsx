import { IWidgetProps } from '@/shared/types';

import { StepSwitcherClient } from './StepSwitcherClient'

function StepSwitcher(props: IWidgetProps) {
    return <StepSwitcherClient {...props} />
}

StepSwitcher.displayName = "StepSwitcher";
export default StepSwitcher;