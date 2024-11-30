const handlePrimaryBtnClick = () => {
    console.log("in childWindow handlePrimaryBtnClick")
    window.api.send("closeChildWindow")
}