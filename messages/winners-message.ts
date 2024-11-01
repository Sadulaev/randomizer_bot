import { User } from "src/user/user.entity";

export default (winners: User[]) => `
        <b>Победители розыгрыша</b>
${
winners.reduce((acc, winner, index) => `${acc}
${index + 1}. <a href="t.me/${winner.username}">${winner.firstName} ${winner.lastName}</a>
`, '')
}
`