export default function () {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septempber", "October", "November", "December"];

    const getFormattedDate = (date: string) => {
        let dateList = date.split("-");
        let year = dateList[0];
        let month = months[+dateList[1] - 1];
        let day = dateList[2].split(" ")[0]
        return `${month} ${day}, ${year}`;
    }

    return getFormattedDate;
}