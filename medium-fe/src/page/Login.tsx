import { Auth } from "../component/Auth"
import { Quote } from "../component/Quote"

export const Login = () => {
    return (
        <div >
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex justify-center items-center">
                    <Auth type="login"/>
                </div>
                <div className="hidden md:block">
                    <Quote />
                </div>
            </div>
        </div>
    )
}