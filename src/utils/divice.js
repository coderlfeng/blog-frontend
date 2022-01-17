export const divice = () => {
    let mb = ['ipad', 'iphone os', 'midp', 'rv:1.2.3.4', 'ucweb', 'android', 'windows ce', 'windows mobile'];
    let isPC = true;
    mb.forEach(v => {
        if (navigator.userAgent.toLowerCase().indexOf(v) >= 0) {
            isPC = false;
            return;
        }
    });
    return isPC;
}