
import localizedFormat from 'dayjs/plugin/localizedFormat'
import dayjs from 'dayjs'


dayjs.locale('pt-br')
dayjs.extend(localizedFormat)

export {dayjs}