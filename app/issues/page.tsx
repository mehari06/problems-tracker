import IssueActions from './list/IssueActions'
import IssueListWrapper from './IssueListWrapper'

const Issuepages = () => {
  return (
    <div>
      <IssueActions />
      <IssueListWrapper />
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default Issuepages
