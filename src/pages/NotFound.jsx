import { Btn } from '../components/UI'
import { IMG } from '../data/site'
import useSEO from '../lib/useSEO'

export default function NotFound() {
  useSEO({ title: 'Page Not Found', description: 'This page could not be found.', noindex: true })
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
