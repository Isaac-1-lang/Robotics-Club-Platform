export type TeamGroup = 'Executive Committee' | 'Technical Leadership' | 'Coordination' | 'Specialist Teams' | 'Robotics Members'

export interface RosterMember {
  id: string
  name: string
  role: string
  group: TeamGroup
  socials?: { github?: string; linkedin?: string; instagram?: string }
}

const rawRoster = `
Isaac Precieux|President
CodeWolf / Bruxe|Vice President
Adelin SHAMI|Secretary
Albert|Treasurer
ALLIANCE Fils Dieudonne|Technical Lead
BYIRINGIRO ALOYS|Hardware Lead
Amanda|Software Lead
Amani|AI/ML Lead
AMELIE GIFT|Embedded Systems Lead
AngeK|Project Coordinator
Anitha|Events Coordinator
Archimedes|Research Lead
ASINGIZWE Benite|Communications Lead
Aubierge|Documentation Lead
Baba / Lao Dev|Design Lead
BATAKARIZA|Media Team
belinda|Events Team
Belise|Robotics Member
Benie / Giramata|Software Team
Blaise|Hardware Team
Bonheur|AI Team
bonny|Electronics Team
Bugingo Eric Derick|Research Team
BYIRINGIRO.E|Media Team
Byukusenge Andre|Events Team
Celia Joy|Robotics Member
Chloe|Software Team
Clare|Hardware Team
Cynthia Marie Nishimwe|Electronics Team
cyuzuzo davine|Research Team
Dan Christian|Media Team
Dios|Events Team
Dorcas|Robotics Member
Doris|Software Team
Dr.Geofrey|Hardware Team
Edwige Sheja|AI Team
Eric|Electronics Team
Eunice|Research Team
fique|Media Team
Fred Gisa|Events Team
G.F..Gloria / Gloria|Robotics Member
Gabriel / N.Mandrake Gabriel|Software Team
Ganza Chaste|Hardware Team
Ganza Daniella|AI Team
Gasore Corene|Electronics Team
gihozo|Research Team
gloria|Media Team
Gloria|Events Team
H_Jean de Dieu|Robotics Member
HappyDavid|Software Team
Henriette|Hardware Team
Herve|AI Team
Hirwa Rukundo Hope|Electronics Team
honor1n3|Research Team
Hope Nishimwe|Media Team
Humura / Elvin|Events Team
I.JOSEPH|Robotics Member
iam|Software Team
IHOZO Raissa Flora|Hardware Team
inkevine|AI Team
isabelle cadeau|Presidente (Female)
Ishara|Research Team
Jenny|Media Team
Jeremy Nkundabagenzi|Events Team
Jules Muneza|Robotics Member
Kaliza|Software Team
Kayumba Jean Marie Vianney|Hardware Team
Kenny.k|AI Team
Igiraneza Keren|Electronics Team
Kirenga Remy|Research Team
KOMEZUSENGE Bolice|Media Team
Krif|Events Team
KWIZERA Olivier|Robotics Member
Laurent|Software Team
Leslie|Hardware Team
Lex|AI Team
Liana|Electronics Team
Linaa|Research Team
Louange-lidvine|Media Team
Nganji Heaven's|Events Team
Nice Usanase|Robotics Member
Nkotanyi|Software Team
Norah|Hardware Team
Nshuti Christian|AI Team
Olga|Electronics Team
Paradie Emmanuella|Research Team
Prisca|Media Team
rubuto yvan|Events Team
R.U.K.U.N.D.O|Robotics Member
Stella|Software Team
sylvie|Hardware Team
Teta|AI Team
tracy|Electronics Team
Uwimanikunda Patrick|Research Team
UWUMUGISHA Heloise Rugie|Media Team
Uwase Vanessa|Events Team
Vieira|Robotics Member
witness|Software Team
yannis|Hardware Team
`.trim()

function getGroup(role: string): TeamGroup {
  if (['President', 'Vice President', 'Secretary', 'Treasurer', 'Presidente (Female)'].includes(role)) return 'Executive Committee'
  if (role.endsWith('Lead')) return 'Technical Leadership'
  if (role.endsWith('Coordinator')) return 'Coordination'
  if (role === 'Robotics Member') return 'Robotics Members'
  return 'Specialist Teams'
}

export const teamRoster: RosterMember[] = rawRoster.split('\n').map((line, index) => {
  const [name, role] = line.split('|')
  return { id: `rca-${index + 1}`, name, role, group: getGroup(role) }
})

export const teamGroupOrder: TeamGroup[] = ['Executive Committee', 'Technical Leadership', 'Coordination', 'Specialist Teams', 'Robotics Members']