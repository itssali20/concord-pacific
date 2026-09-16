import { Btn } from '../components/UI'
import { IMG } from '../data/site'

export default function NotFound() {
  return (
    <section className="nf">
      <img src={IMG('estate-horizon')} alt="" />
      <div className="nf__in">
        <p className="eyebrow eyebrow--light">404</p>
        <h1 className="h1 light">This address is <em>private.</em></h1>
        <Btn to="/" variant="btn--light">Return home</Btn>
      </div>
    </section>
  )
}
