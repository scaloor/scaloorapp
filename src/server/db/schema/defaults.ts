import { createId } from '@paralleldrive/cuid2'

export function scaloorId(prefix: string) {
    const randomId = createId();
    return `${prefix}_${randomId}`
}