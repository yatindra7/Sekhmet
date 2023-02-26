import { HiTrendingDown, HiTrendingUp, HiUser } from 'react-icons/hi'

function HomeCard(props: {title: string, count: number, percentChange: number, changeType: 'positive' | 'negative' | 'neutral', color: 'red'|'orange'|'green'|'blue'}) {
    return(
        <div className="home-card">
            <div className="top">
                <div className='icon-wrapper' data-color={props.color}><HiUser size={30} /></div>
                <div className='title'>{props.title}</div>
            </div>
            <div className='bottom'>
                <div className='count'>{props.count}</div>
                <div className='change' data-type={props.changeType}>
                    {props.percentChange === 0 ? "---" : (
                        <>
                            {props.percentChange > 0 ? <HiTrendingUp /> : <HiTrendingDown /> }
                            <div className='percent-change'>{props.percentChange}%</div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomeCard