export const getNoticeById = (id: string,noticeArr: object ) => {
    if (Object.keys(noticeArr).length) {
        if (Object.keys(noticeArr).includes(id)) {
            return (noticeArr as any)[id]
        }
    }
    else return ""
}