const padNumber = (number: number, length: number = 2): string => {
    //แปลงรูปแบบตัวเลขให้มี 0 นำหน้าในกรณีที่เป็นหลักหน่วย เช่น 1 เป็น 01
    //? length = 2 will return 0x, length = 3 will return 00x
    var str = '' + number
    while (str.length < length) {
        str = '0' + str
    }
    return str
}

export { padNumber }
