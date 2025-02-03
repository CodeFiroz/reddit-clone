import Card from '../Components/Card/Card'
import Header from '../Components/Header/Header'

const Dashboard = () => {
    return (
        <>

        <Header />

            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">


                <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">

                <Card/>
                <Card/>
                <Card/>
                <Card/>

                </div>


                </div>
            </div>

        </>
    )
}

export default Dashboard
