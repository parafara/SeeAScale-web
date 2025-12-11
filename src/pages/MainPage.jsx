import Header from "@components/Header/Header.jsx";
import ControllBox from "@components/ControllBox/ControllBox.jsx";

function MainPage() {
    return (
        <div style={{display: "flex", height: "100vh", flexDirection: "column", justifyContent: "space-between"}}>
            <Header />
            <ControllBox />
        </div>
    )
}

export default MainPage;