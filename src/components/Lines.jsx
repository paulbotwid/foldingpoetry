export default function Lines({line, index, poemLinesLength}) {
    return (
        <>
        <span className="poem-line first-line">
            {line.firstLine}
        </span>
        {index !== poemLinesLength-1 && <br></br>}
        {line.secondLine && <span className="poem-line second-line">{line.secondLine}</span>}
        {!!line.firstLine.match(/^[.,:!?]/) === false && <em> </em>}
        </>
    )
}