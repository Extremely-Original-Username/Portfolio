import SplashHeaderProps from "../model/props/splashHeaderProps";

const SplashHeader = (props: SplashHeaderProps) => {
    return (
        <div className="splashHeader">
            <h1>{props.title}</h1>
            <h2>{props.subTitle}</h2>
        </div>
    )
}

export default SplashHeader;