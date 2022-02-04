import type { ActionFunction } from "remix";

import {
  LoginOrRegister,
  loginOrRegisterAction,
} from "~/components/LoginOrRegister";

export const action: ActionFunction = loginOrRegisterAction;

const RegisterRoute = () => (<div>
  <a href="https://grace.substack.com/about?utm_source=menu-dropdown">About</a
  ><a href="https://grace.substack.com/archive?utm_source=menu-dropdown"
    >Archive</a
  ><a
    href="https://support.substack.com/hc/en-us?s=support%2Bgrace%40substack.com"
    native="true"
    >Help</a
  ><a
    href="https://grace.substack.com/account?utm_source=menu-dropdown"
    native="true"
    >My Account</a
  ><a
    href="https://substack.com/sign-out?redirect=&amp;for_pub=grace"
    native="true"
    >Sign out</a
  ><a class="portable-archive-tab new-tab active">Archive</a
  ><a class="portable-archive-tab top-tab">Top</a
  ><a class="portable-archive-tab community-tab">Discussion</a
  ><a
    class="portable-archive-tab mobile-only"
    href="https://grace.substack.com/about"
    >About</a
  ><a
    href="https://grace.substack.com/p/belatedly-im-leaving-substack"
    class="post-preview-title newsletter"
    >Belatedly, I’m Leaving Substack</a
  ><a
    href="https://grace.substack.com/p/belatedly-im-leaving-substack"
    class="post-preview-description"
    >A little less than a year ago, I accepted a Substack Pro deal for a
    significant amount of money to publish on this platform for a year. Today,
    I’m…</a
  ><a
    href="https://grace.substack.com/p/please-miss"
    class="post-preview-title newsletter"
    >Please Miss</a
  ><a
    href="https://grace.substack.com/p/please-miss"
    class="post-preview-description"
    >a sincere note of "please buy my book"</a
  ><a
    href="https://grace.substack.com/p/dp"
    class="post-preview-title newsletter"
    >dp </a
  ><a href="https://grace.substack.com/p/dp" class="post-preview-description"
    >There are too many registers of the sexually explicit. Let’s consolidate
    them: pornography into anatomy, and frank disclosure into unstilled
    fantasy…</a
  ><a
    href="https://grace.substack.com/p/please-prof-stock-sue-me-for-defamation"
    class="post-preview-title newsletter"
    >Please, Prof. Stock, Sue Me for Defamation, So We Can Finally Figure Out
    What Your Point Was</a
  ><a
    href="https://grace.substack.com/p/please-prof-stock-sue-me-for-defamation"
    class="post-preview-description"
    >I’m republishing here a short article entitled “Sussex Uni decide not to
    take action against Kathleen Stock over trans comments,” which was written
    by a…</a
  ><a
    href="https://grace.substack.com/p/coda-the-duke-of-edinburgh"
    class="post-preview-title newsletter"
    >coda: the duke of edinburgh</a
  ><a
    href="https://grace.substack.com/p/coda-the-duke-of-edinburgh"
    class="post-preview-description"
    >Another conference. And I am saying, no, it’s not a thesis, it’s a
    proposition. The term “thesis” blurs an important distinction between theme
    and…</a
  ><a
    href="https://grace.substack.com/p/a-christmas-note"
    class="post-preview-title newsletter"
    >A Christmas note</a
  ><a
    href="https://grace.substack.com/p/a-christmas-note"
    class="post-preview-description"
    >Dear all, Just wanted to say a quick hi to the wider list, and to let you
    all know a bit about what I’ve been up to for the last few weeks. The
    main…</a
  ><a
    href="https://grace.substack.com/p/how-i-came-to-buy-a-new-coat"
    class="post-preview-title newsletter"
    >how i came to buy a new coat</a
  ><a
    href="https://grace.substack.com/p/how-i-came-to-buy-a-new-coat"
    class="post-preview-description"
    >“If romanticism’s so bad, why are you always howling?,” I asked the
    well-dressed assistant director at the mic. She looked back agog, then
    changed into…</a
  ><a
    href="https://grace.substack.com/p/homosexuality"
    class="post-preview-title newsletter"
    >Homosexuality</a
  ><a
    href="https://grace.substack.com/p/homosexuality"
    class="post-preview-description"
    >(support Scorpio) I’m going to say some things that happened. (We pretend
    that constative and performative are coeval. They aren’t. Let’s stop…</a
  ><a
    href="https://grace.substack.com/p/fritto4545"
    class="post-preview-title newsletter"
    >fritto4545</a
  ><a
    href="https://grace.substack.com/p/fritto4545"
    class="post-preview-description"
    >dear CARTRIDGE: hope you sunningly floured twice this winter but D[esire]
    would have you have known permanent constipation will always eventually
    lead…</a
  ><a
    href="https://grace.substack.com/p/of-pearl-mother"
    class="post-preview-title newsletter"
    >of Pearl, Mother</a
  ><a
    href="https://grace.substack.com/p/of-pearl-mother"
    class="post-preview-description"
    >for you, Władziu Valentino You left me a nugget of Scandinavian glass
    zipped into leather; I bound to my office door; someone stole therefrom. The
    end…</a
  ><a
    href="https://grace.substack.com/p/tom-barbara-margo-jerry"
    class="post-preview-title newsletter"
    >Tom, Barbara, Margo, Jerry</a
  ><a
    href="https://grace.substack.com/p/tom-barbara-margo-jerry"
    class="post-preview-description"
    >note on the good life</a
  ><a
    href="https://grace.substack.com/p/rough-and-smooth-dystopias"
    class="post-preview-title newsletter"
    >Rough and Smooth Dystopias</a
  ><a
    href="https://grace.substack.com/p/rough-and-smooth-dystopias"
    class="post-preview-description"
    >I’m beginning to worry that my old system for classifying dystopian
    franchises has had its day, and I’ve not even published it yet. So I’m
    rushing this…</a
  ><a
    href="https://grace.substack.com/p/why-is-andrew-doyle-so-afraid-of"
    class="post-preview-title newsletter"
    >Why Is Andrew Doyle So Afraid of Conversation?</a
  ><a
    href="https://grace.substack.com/p/why-is-andrew-doyle-so-afraid-of"
    class="post-preview-description"
    >As I’ve mentioned on here a few times, I used to be friends with this guy,
    Andrew Doyle: Andrew’s now a big-shot TV presenter in the UK, but he was
    one…</a
  ><a
    href="https://grace.substack.com/p/academic-freedom-for-all"
    class="post-preview-title newsletter"
    >Academic freedom for all!</a
  ><a
    href="https://grace.substack.com/p/academic-freedom-for-all"
    class="post-preview-description"
    >Dear all, Over the weekend, I’ll be writing out a fuller account of the
    last two weeks of activism re. protecting students’ academic freedom and
    right…</a
  ><a
    href="https://grace.substack.com/p/a-conversation-with-prof-john-collins"
    class="post-preview-title newsletter"
    >A Conversation With Prof. John Collins, Organizer of "Philosopher's Letter"
    of Support for Prof. Kathleen Stock</a
  ><a
    href="https://grace.substack.com/p/a-conversation-with-prof-john-collins"
    class="post-preview-description"
    >To my surprise, my essay from Sunday, “The UK Media Has Seriously Bungled
    the Kathleen Stock Story,” has achieved what publicists call “mild
    virality…</a
  ><a
    href="https://grace.substack.com/p/the-uk-media-has-seriously-bungled"
    class="post-preview-title newsletter"
    >The UK Media Has Seriously Bungled the Kathleen Stock Story</a
  ><a
    href="https://grace.substack.com/p/the-uk-media-has-seriously-bungled"
    class="post-preview-description"
    >This is a long essay. It has to be, because the errors made in reporting
    the Stock story are many and consequential. The upshot is: Adam Tickell, the
    VC…</a
  ><a
    href="https://grace.substack.com/p/teds-nut-ted-cruz-tries-to-keep-still"
    class="post-preview-title newsletter"
    >Ted’s Nut (Ted Cruz Tries to Keep Still While Getting Head)</a
  ><a
    href="https://grace.substack.com/p/teds-nut-ted-cruz-tries-to-keep-still"
    class="post-preview-description"
    >Hi all. It’s been a while since I wrote. For the last four weeks or so,
    I’ve been in bed with Covid and its aftermath, and I’ve not really been able
    to…</a
  ><a
    href="https://grace.substack.com/p/ive-decided-to-help-out-an-old-foe"
    class="post-preview-title newsletter"
    >I've Decided to Help Out an Old Foe</a
  ><a
    href="https://grace.substack.com/p/ive-decided-to-help-out-an-old-foe"
    class="post-preview-description"
    >Please give generously.</a
  ><a
    href="https://grace.substack.com/p/this-is-how-badly-the-free-speech"
    class="post-preview-title newsletter"
    >This Is How Badly the Free Speech Absolutists Fucked Up the Graham Linehan
    Case Back in April</a
  ><a
    href="https://grace.substack.com/p/this-is-how-badly-the-free-speech"
    class="post-preview-description"
    >pretty badly. pretty badly!</a
  ><a
    href="https://grace.substack.com/p/i-bet-that-got-a-laugh"
    class="post-preview-title newsletter"
    >I Bet That Got a Laugh</a
  ><a
    href="https://grace.substack.com/p/i-bet-that-got-a-laugh"
    class="post-preview-description"
    >a story of Clinton</a
  ><a
    href="https://grace.substack.com/p/alan-sokal-science-prankster"
    class="post-preview-title newsletter"
    >Alan Sokal, Science Prankster</a
  ><a
    href="https://grace.substack.com/p/alan-sokal-science-prankster"
    class="post-preview-description"
    >Well, there I was, just minding my business, when this happened: Being sent
    an inconspicuous little letter from the King of Sting felt, I will admit…</a
  ><a
    href="https://grace.substack.com/p/vinegar-notes"
    class="post-preview-title newsletter"
    >Vinegar Notes</a
  ><a
    href="https://grace.substack.com/p/vinegar-notes"
    class="post-preview-description"
    >Of Phatic Phonemes and Compulsory Pronouns</a
  ><a
    href="https://grace.substack.com/p/unqueering-the-essay-part-iv"
    class="post-preview-title newsletter"
    >Unqueering the Essay, Part IV</a
  ><a
    href="https://grace.substack.com/p/unqueering-the-essay-part-iv"
    class="post-preview-description"
    >Do we just want those we love to be on our teams? I’m aware of how much of
    this work––not just mine, but Castle’s and maybe Sontag’s too––seems to…</a
  ><a
    href="https://grace.substack.com/p/unqueering-the-essay-part-iii"
    class="post-preview-title newsletter"
    >Unqueering the Essay, Part III</a
  ><a
    href="https://grace.substack.com/p/unqueering-the-essay-part-iii"
    class="post-preview-description"
    >Among the many juicy tidbits that Castle serves up in “Desperately Seeking
    Susan”––an essay, I might as well say, that I prefer to anything Sontag…</a
  ><a
    href="https://grace.substack.com/p/unqueering-the-essay-part-ii"
    class="post-preview-title newsletter"
    >Unqueering the Essay, Part II</a
  ><a
    href="https://grace.substack.com/p/unqueering-the-essay-part-ii"
    class="post-preview-description"
    >At the Paris Dyke March this weekend, a group of women carried a banner
    that read “les LESBIENNES n’aiment PAS les PENIS,” lesbians don’t like
    dicks…</a
  ><a
    href="https://grace.substack.com/p/unqueering-the-essay-part-i"
    class="post-preview-title newsletter"
    >Unqueering the Essay, Part I</a
  ><a
    href="https://grace.substack.com/p/unqueering-the-essay-part-i"
    class="post-preview-description"
    >I’ve been working for the last few weeks on an essay about essays, and more
    specifically about the genre of essays in which queer authors write
    about…</a
  ><a
    href="https://grace.substack.com/p/a-conflict-about-twitter-with-my"
    class="post-preview-title newsletter"
    >A Conflict, about Twitter, with My Husband</a
  ><a
    href="https://grace.substack.com/p/a-conflict-about-twitter-with-my"
    class="post-preview-description"
    >reposted from Danny’s newsletter, The Chatner</a
  ><a
    href="https://grace.substack.com/p/bless-this-mess"
    class="post-preview-title newsletter"
    >BLESS THIS MESS</a
  ><a
    href="https://grace.substack.com/p/bless-this-mess"
    class="post-preview-description"
    >a shorter note</a
  ><a
    href="https://grace.substack.com/p/my-mommi-is-a-they"
    class="post-preview-title newsletter"
    >My Mommi Is a They</a
  ><a
    href="https://grace.substack.com/p/my-mommi-is-a-they"
    class="post-preview-description"
    >RIP Lauren Berlant.</a
  ><a
    href="https://grace.substack.com/p/twitter-has-locked-me-out-of-my-account"
    class="post-preview-title newsletter"
    >Twitter Has Locked Me Out of My Account for Teaching Feminist Visual
    Culture</a
  ><a
    href="https://grace.substack.com/p/twitter-has-locked-me-out-of-my-account"
    class="post-preview-description"
    >This morning I was informed that one of my tweets had fallen afoul of the
    Twitter “rules against abuse and harassment.” The tweet in question, which
    I…</a
  ><a
    href="https://grace.substack.com/p/stoner-deductiveness-part-vi"
    class="post-preview-title newsletter"
    >Stoner Deductiveness, Part VI</a
  ><a
    href="https://grace.substack.com/p/stoner-deductiveness-part-vi"
    class="post-preview-description"
    >To recap the argument. (“The story so far.”) I have noticed that trans
    people seem weary of being the subject of endless theoretical speculations,
    and…</a
  ><a
    href="https://grace.substack.com/p/please-miss-is-available-to-pre-order"
    class="post-preview-title newsletter"
    >Please Miss Is Available to Pre-Order, So Why Not? Go On.</a
  ><a
    href="https://grace.substack.com/p/please-miss-is-available-to-pre-order"
    class="post-preview-description"
    >What’s in a name? A rose by any other name would smell as sweet. Rather
    defensive, you’ll think, and perhaps something to test out: pluck a rose,
    put it…</a
  ><a
    href="https://grace.substack.com/p/libby-brooks-article-about-marion"
    class="post-preview-title newsletter"
    >Libby Brooks’ Article About Marion Millar Is Propaganda for an Online Hate
    Group</a
  ><a
    href="https://grace.substack.com/p/libby-brooks-article-about-marion"
    class="post-preview-description"
    >Why does the Guardian do this?</a
  ><a
    href="https://grace.substack.com/p/stoner-deductiveness-part-v"
    class="post-preview-title newsletter"
    >Stoner Deductiveness, Part V</a
  ><a
    href="https://grace.substack.com/p/stoner-deductiveness-part-v"
    class="post-preview-description"
    >I don’t know what I think about auto-theory. It seems like one way out of
    the relevance-and-hype market of academic prose, which has been in rapid
    and…</a
  ><a
    href="https://grace.substack.com/p/stoner-deductiveness-part-iv"
    class="post-preview-title newsletter"
    >Stoner Deductiveness, Part IV</a
  ><a
    href="https://grace.substack.com/p/stoner-deductiveness-part-iv"
    class="post-preview-description"
    >The neo-noir has always had an affinity with marijuana. And close kin with
    the stoner caper: the first Cheech and Chong movie, Up in Smoke, shares
    with…</a
  ><a
    href="https://grace.substack.com/p/stoner-deductiveness-part-iii"
    class="post-preview-title newsletter"
    >Stoner Deductiveness, Part III</a
  ><a
    href="https://grace.substack.com/p/stoner-deductiveness-part-iii"
    class="post-preview-description"
    >It’s early March 2021, and I’m a couple of weeks late on the final final
    deadline Emma Heaney has given me for submitting an essay for her
    collection…</a
  ><a
    href="https://grace.substack.com/p/stoner-deductions-part-ii"
    class="post-preview-title newsletter"
    >Stoner Deductions, Part II</a
  ><a
    href="https://grace.substack.com/p/stoner-deductions-part-ii"
    class="post-preview-description"
    >The work of psychoanalysis depends upon the un-sutured co-presence of
    interpreter and witness. This is, as Paul Ricoeur points out, one of the
    central…</a
  ><a
    href="https://grace.substack.com/p/stoner-deductions-part-i"
    class="post-preview-title newsletter"
    >Stoner Deductions, Part I</a
  ><a
    href="https://grace.substack.com/p/stoner-deductions-part-i"
    class="post-preview-description"
    >I’ve been writing a lot recently about stoner neo-noir movies, and the ways
    in which they seem to me to crystallize a certain kind of desire that I
    see…</a
  ><a
    href="https://grace.substack.com/p/somebody-elses-beauty-and-my-beauty"
    class="post-preview-title newsletter"
    >Somebody Else’s Beauty and&nbsp;My Beauty</a
  ><a
    href="https://grace.substack.com/p/somebody-elses-beauty-and-my-beauty"
    class="post-preview-description"
    >essay on Kevin Rowland's 1999 album, and a little Kant</a
  ><a
    href="https://grace.substack.com/p/one-weird-trick-part-iii"
    class="post-preview-title newsletter"
    >One Weird Trick, Part III</a
  ><a
    href="https://grace.substack.com/p/one-weird-trick-part-iii"
    class="post-preview-description"
    >The third and final installment of the introduction to PLEASURE AND
    EFFICACY. Previous installments here and here. part three: “it works. it
    really…</a
  ><a
    href="https://grace.substack.com/p/one-weird-trick-part-ii"
    class="post-preview-title newsletter"
    >One Weird Trick, Part II</a
  ><a
    href="https://grace.substack.com/p/one-weird-trick-part-ii"
    class="post-preview-description"
    >The second excerpt from the introduction to PLEASURE AND EFFICACY, my
    current monograph-in-progress. part two: from winning to wooing and back
    to…</a
  ><a
    href="https://grace.substack.com/p/one-weird-trick"
    class="post-preview-title newsletter"
    >"One Weird Trick"</a
  ><a
    href="https://grace.substack.com/p/one-weird-trick"
    class="post-preview-description"
    >excerpt from PLEASURE AND EFFICACY</a
  ><a
    href="https://grace.substack.com/p/change-of-content-moderation-policy"
    class="post-preview-title newsletter"
    >Change of Content Moderation Policy...</a
  ><a
    href="https://grace.substack.com/p/change-of-content-moderation-policy"
    class="post-preview-description"
    >...ugh, why are people so awful.</a
  ><a
    href="https://grace.substack.com/p/lets-explain-the-basics-of-free-speech"
    class="post-preview-title newsletter"
    >Let’s Explain the Basics of Free Speech to Jesse Singal and Katie Herzog,
    Shall We?</a
  ><a
    href="https://grace.substack.com/p/lets-explain-the-basics-of-free-speech"
    class="post-preview-description"
    >Syllabus check! By the time you have read this, you should be able to tell
    the difference between: ✅ a libel! ✅a defamation! ✅ an opinion! ✅ a
    fact! ✅…</a
  ><a
    href="https://grace.substack.com/p/quick-clarification-re-new-york-times"
    class="post-preview-title newsletter"
    >Quick Clarification re. New York Times</a
  ><a
    href="https://grace.substack.com/p/quick-clarification-re-new-york-times"
    class="post-preview-description"
    >The New York Times just ran a story by Ben Smith on the Substack wars, and
    my husband Danny’s decision to take a Substack Pro contract. I think it’s
    a…</a
  ><a
    href="https://grace.substack.com/p/terf-data-washing-part-1-of-"
    class="post-preview-title newsletter"
    >Terf Data-Washing, Part 1 of ???</a
  ><a
    href="https://grace.substack.com/p/terf-data-washing-part-1-of-"
    class="post-preview-description"
    >First in a new series of brief tidbits detailing the intellectual
    dishonesty of the anti-transgender movement. Less useful to chew on, than
    simply to…</a
  ><a
    href="https://grace.substack.com/p/whither-urkel"
    class="post-preview-title newsletter"
    >Whither Urkel?</a
  ><a
    href="https://grace.substack.com/p/whither-urkel"
    class="post-preview-description"
    >Today I gave a talk at the “Awkwardness” seminar of the American
    Comparative Literature Association, organized by Shirl Yang (Chicago) and
    Cheng-Chai…</a
  ><a
    href="https://grace.substack.com/p/the-divisional-court-brought-to-that"
    class="post-preview-title newsletter"
    >“The Divisional Court Brought to That Decision a Series of Preconceptions
    about Gender’: A Conversation with Jolyon Maugham, QC</a
  ><a
    href="https://grace.substack.com/p/the-divisional-court-brought-to-that"
    class="post-preview-description"
    >Last Friday, the High Court of the UK reversed the practical effects of the
    Bell vs. Tavistock case, which determined that puberty blockers were
    exempt…</a
  ><a
    href="https://grace.substack.com/p/an-explanation-and-some-rules"
    class="post-preview-title newsletter"
    >An Explanation, and Some Rules</a
  ><a
    href="https://grace.substack.com/p/an-explanation-and-some-rules"
    class="post-preview-description"
    >Yesterday morning, I launched my new Substack, THE WAZZOCK’S REVIEW, with
    an essay entitled “Graham Linehan Should Be Kicked Off Substack,” in which
    I…</a
  ><a
    href="https://grace.substack.com/p/graham-linehan-should-be-kicked-off"
    class="post-preview-title newsletter"
    >Graham Linehan Should Be Kicked Off Substack</a
  ><a
    href="https://grace.substack.com/p/graham-linehan-should-be-kicked-off"
    class="post-preview-description"
    >welcome to my new substack newsletter; and let's close Graham Linehan's</a
  ><a
    href="https://grace.substack.com/p/110092-for-the-birmingham-lgbt-centre"
    class="post-preview-title newsletter"
    >$1,100.92 for the Birmingham LGBT Centre</a
  ><a
    href="https://grace.substack.com/p/110092-for-the-birmingham-lgbt-centre"
    class="post-preview-description"
    >Hi all, Happy new year! I apologize for being a bit out of the loop
    recently. As some of you have perhaps seen on Twitter, I’m currently dealing
    with…</a
  ><a
    href="https://grace.substack.com/p/212374-for-birmingham-lgbt"
    class="post-preview-title newsletter"
    >£2,123.74 for Birmingham LGBT</a
  ><a
    href="https://grace.substack.com/p/212374-for-birmingham-lgbt"
    class="post-preview-description"
    >Dear friends, Thank you to all of you who sent money to this newsletter for
    me to pass on to the Birmingham LGBT Centre. We raised $2,664.95, to
    which…</a
  ><a
    href="https://grace.substack.com/p/lavery-in-foreign-policy-a-high-court"
    class="post-preview-title newsletter"
    >Lavery in /Foreign Policy/: "A High Court Decision in Britain Puts Trans
    People Everywhere at Risk"</a
  ><a
    href="https://grace.substack.com/p/lavery-in-foreign-policy-a-high-court"
    class="post-preview-description"
    >Here’s the essay on British gender critical feminists’ capture of juridical
    and media institutions that I’ve been trying to place all year, finally…</a
  ><a
    href="https://grace.substack.com/p/changes-trolls-anger-solidarity"
    class="post-preview-title newsletter"
    >Changes, Trolls, Anger, Solidarity</a
  ><a
    href="https://grace.substack.com/p/changes-trolls-anger-solidarity"
    class="post-preview-description"
    >Hi all, A challenging few weeks here on the Stage Mirror, which has led me
    to make a couple of changes to the set-up here. The upshot is that I’m…</a
  ><a
    href="https://grace.substack.com/p/free-speech-activists-are-trying"
    class="post-preview-title newsletter"
    >Free Speech Activists Are Trying to Get Me Fired Because They Didn’t Like a
    Joke I Made</a
  ><a
    href="https://grace.substack.com/p/free-speech-activists-are-trying"
    class="post-preview-description"
    >So, this is written in a newspaperly style, because I was hoping to place
    it in a newspaper. I have not been able to. Despite this story having
    been…</a
  ><a
    href="https://grace.substack.com/p/fahrenheit-1984"
    class="post-preview-title newsletter"
    >Fahrenheit 1984</a
  ><a
    href="https://grace.substack.com/p/fahrenheit-1984"
    class="post-preview-description"
    >the dystopian craze that's seducing our mothers</a
  ><a
    href="https://grace.substack.com/p/i-won-a-big-prize-and-they-are-having"
    class="post-preview-title newsletter"
    >I WON A BIG PRIZE AND THEY ARE HAVING A PARTY FOR ME</a
  ><a
    href="https://grace.substack.com/p/i-won-a-big-prize-and-they-are-having"
    class="post-preview-description"
    >Dear all, Some happy news! The North American Victorian Studies Association
    has awarded Quaint, Exquisite: Victorian Aesthetics and the Idea of
    Japan…</a
  ><a
    href="https://grace.substack.com/p/egg-theorys-early-style"
    class="post-preview-title newsletter"
    >EGG THEORY'S EARLY STYLE</a
  ><a
    href="https://grace.substack.com/p/egg-theorys-early-style"
    class="post-preview-description"
    >Hello all, I write with the exciting (to me) news that the final part of
    what I’ve called the “princess peach trilogy” of scholarly essays has
    been…</a
  ><a
    href="https://grace.substack.com/p/my-words-to-joanne-rowling-above"
    class="post-preview-title newsletter"
    >My Words to Joanne Rowling Above the Towers of Hogwarts</a
  ><a
    href="https://grace.substack.com/p/my-words-to-joanne-rowling-above"
    class="post-preview-description"
    >Performing Transgender Civility</a
  ><a
    href="https://grace.substack.com/p/hey-guess-what"
    class="post-preview-title newsletter"
    >hey guess what</a
  ><a
    href="https://grace.substack.com/p/hey-guess-what"
    class="post-preview-description"
    >Friends, I have the most extraordinary news. But perhaps you heard it
    already: I rather rashly broadcasted my good fortune from all three…</a
  ><a
    href="https://grace.substack.com/p/on-fucking-octopuses"
    class="post-preview-title newsletter"
    >on fucking octopuses</a
  ><a
    href="https://grace.substack.com/p/on-fucking-octopuses"
    class="post-preview-description"
    >A couple of days ago, the Marxist-feminist theorist Sophie Lewis tweeted a
    thread about a documentary she’d seen involving a man’s relationship with
    an…</a
  ><a
    href="https://grace.substack.com/p/sorted"
    class="post-preview-title newsletter"
    >sorted</a
  ><a
    href="https://grace.substack.com/p/sorted"
    class="post-preview-description"
    >“Place the bag upon your head, child, and you shall know which is the way
    you must go. And we shall raise you in the way you must go.” So the bag
    was…</a
  ><a
    href="https://grace.substack.com/p/ending-things"
    class="post-preview-title newsletter"
    >Ending Things</a
  ><a
    href="https://grace.substack.com/p/ending-things"
    class="post-preview-description"
    >Charlie Kaufman and Guy Debord</a
  ><a
    href="https://grace.substack.com/p/i-am-branded"
    class="post-preview-title newsletter"
    >I AM BRANDED </a
  ><a
    href="https://grace.substack.com/p/i-am-branded"
    class="post-preview-description"
    >Dearest ones, Thank you so much to those of you who wrote in response to my
    rather peremptory (not to say officious) request for branding info. I…</a
  ><a
    href="https://grace.substack.com/p/brand-me-baby-all-night-long"
    class="post-preview-title newsletter"
    >BRAND ME BABY ALL NIGHT LONG</a
  ><a
    href="https://grace.substack.com/p/brand-me-baby-all-night-long"
    class="post-preview-description"
    >Okay, I have a brand, right? Right. It’s a grim thing to acknowledge but
    after all why be euphemistic about it? People buy my book or pay for
    this…</a
  ><a
    href="https://grace.substack.com/p/writing-palooza"
    class="post-preview-title newsletter"
    >WRITING PALOOZA</a
  ><a
    href="https://grace.substack.com/p/writing-palooza"
    class="post-preview-description"
    >there's a writing palooza. palooza everywhere</a
  ><a
    href="https://grace.substack.com/p/transeksual-fuck-island"
    class="post-preview-title newsletter"
    >TRANSEKSUAL FUCK ISLAND</a
  ><a
    href="https://grace.substack.com/p/transeksual-fuck-island"
    class="post-preview-description"
    >the return of Dickory Nixon</a
  ><a
    href="https://grace.substack.com/p/critical-inquiry"
    class="post-preview-title newsletter"
    >CRITICAL INQUIRY</a
  ><a
    href="https://grace.substack.com/p/critical-inquiry"
    class="post-preview-description"
    >self-promotion</a
  ><a
    href="https://grace.substack.com/p/a-little-more-on-fathers-day"
    class="post-preview-title newsletter"
    >a little more on father’s day</a
  ><a
    href="https://grace.substack.com/p/a-little-more-on-fathers-day"
    class="post-preview-description"
    >bug, humbar!</a
  ><a
    href="https://grace.substack.com/p/in-your-face-in-my-face-in-everyones"
    class="post-preview-title newsletter"
    >IN YOUR FACE, IN MY FACE, IN EVERYONE'S MOTHERFUCKING GAY-ASS FACE</a
  ><a
    href="https://grace.substack.com/p/in-your-face-in-my-face-in-everyones"
    class="post-preview-description"
    >Lez all read Bostock v. Clayton County!! Just to be clear: this is not a
    “love is love” case or a “privacy of your own home” case. It’s not Lawrence
    v…</a
  ><a
    href="https://grace.substack.com/p/new-words"
    class="post-preview-title newsletter"
    >new words</a
  ><a
    href="https://grace.substack.com/p/new-words"
    class="post-preview-description"
    >On the day that the fascist gangster in the White House declares
    anti-fascist activism as such a “terrorist organization,” I find myself
    wondering what…</a
  ><a
    href="https://grace.substack.com/p/sedgwick"
    class="post-preview-title newsletter"
    >Sedgwick</a
  ><a
    href="https://grace.substack.com/p/sedgwick"
    class="post-preview-description"
    >Not that I have any interest in “canceling” a major critic, but I have
    noticed over the last few years a great deal of sentimental attachment to
    Eve…</a
  ><a
    class="name-link"
    href="https://substack.com/profile/1510934-grace-lavery-"
    native="true"
    >Grace Lavery 🐬</a
  ><a
    class="more-subs-link"
    href="https://substack.com/profile/1510934-grace-lavery-"
    native="true"
    >+3 more</a
  ><a
    href="https://grace.substack.com/p/a-political-endorsement"
    class="post-preview-title newsletter"
    >a political "endorsement"</a
  ><a
    href="https://grace.substack.com/p/a-political-endorsement"
    class="post-preview-description"
    >I guess I don’t mind saying that, if I were an American citizen, I would
    have voted for Bernie Sanders today. A late judgment, and one that I think
    is…</a
  ><a
    href="https://grace.substack.com/p/note-on-the-future-of-the-mirror"
    class="post-preview-title newsletter"
    >note on the future of the mirror</a
  ><a
    href="https://grace.substack.com/p/note-on-the-future-of-the-mirror"
    class="post-preview-description"
    >Hello friends, Last week, The Stage Mirror had its first birthday. It’s
    been a week since I wrote for the newsletter, and so I thought I’d send you
    all…</a
  ><a
    href="https://grace.substack.com/p/a-readers-guide-to-today-i-met-the"
    class="post-preview-title newsletter"
    >a reader's guide to "Today I Met the Boy I'm Gonna Yoko"</a
  ><a
    href="https://grace.substack.com/p/a-readers-guide-to-today-i-met-the"
    class="post-preview-description"
    >Yoko Ono, Painting to Hammer a Nail (1961) I don’t usually do this, and I’m
    going to keep it brief, but basically I guess I was recently alerted to
    the…</a
  ><a
    href="https://grace.substack.com/p/fuck-or-make-off-the-love-a-conversation"
    class="post-preview-title newsletter"
    >Fuck or Make Off the Love: a Conversation with Danny Lavery</a
  ><a
    href="https://grace.substack.com/p/fuck-or-make-off-the-love-a-conversation"
    class="post-preview-description"
    >The first half of this conversation is up at the Shatner Chatner. Daniel
    Lavery: Now seems like the appropriate time to link to Every Time Liz Lemon
    Was…</a
  ><a
    href="https://grace.substack.com/p/edward-penishands-some-further-recollections"
    class="post-preview-title newsletter"
    >Edward Penishands, Some Further Recollections </a
  ><a
    href="https://grace.substack.com/p/edward-penishands-some-further-recollections"
    class="post-preview-description"
    >…there are a couple of pornographic images towards the end of this essay,
    please be warned… I was talking on here the other day about the first porn
    I…</a
  ><a
    href="https://grace.substack.com/p/the-kings-two-anuses"
    class="post-preview-title newsletter"
    >The King's Two Anuses</a
  ><a
    href="https://grace.substack.com/p/the-kings-two-anuses"
    class="post-preview-description"
    >At last, my essay “The King’s Two Anuses: Trans Feminism and Free Speech”
    has been published by Differences: you can read it here if you have…</a
  ><a
    href="https://grace.substack.com/p/on-moving-to-new-york-in-ones-thirties"
    class="post-preview-title newsletter"
    >On Moving to New York in One’s Thirties</a
  ><a
    href="https://grace.substack.com/p/on-moving-to-new-york-in-ones-thirties"
    class="post-preview-description"
    >The first time I came to New York on my own, was on or slightly after my
    twentieth birthday, 03/17/2003. Historians will note that on or around
    that…</a
  ><a
    href="https://grace.substack.com/p/new-horizons-for-mumsnet"
    class="post-preview-title newsletter"
    >New Horizons for Mumsnet </a
  ><a
    href="https://grace.substack.com/p/new-horizons-for-mumsnet"
    class="post-preview-description"
    >help us help you</a
  ><a
    href="https://grace.substack.com/p/the-first-stone"
    class="post-preview-title newsletter"
    >The First Stone</a
  ><a
    href="https://grace.substack.com/p/the-first-stone"
    class="post-preview-description"
    >Yesterday afternoon I participated in a roundtable discussion commemorating
    the fiftieth anniversary of the Stonewall riots. My paper, below,
    attempted…</a
  ><a
    href="https://grace.substack.com/p/beyond-the-reality-principle"
    class="post-preview-title newsletter"
    >Beyond the Reality Principle</a
  ><a
    href="https://grace.substack.com/p/beyond-the-reality-principle"
    class="post-preview-description"
    >This morning I spoke at an MLA roundtable commemorating the hundredth
    anniversary of Freud’s paper “Beyond the Pleasure Principle.” It was a
    really…</a
  ><a
    href="https://grace.substack.com/p/a-shift"
    class="post-preview-title newsletter"
    >a shift </a
  ><a
    href="https://grace.substack.com/p/a-shift"
    class="post-preview-description"
    >elegy for a nice dress I acquired in or around 2003</a
  ><a
    href="https://grace.substack.com/p/intellectual-masturbation-im-going"
    class="post-preview-title newsletter"
    >Intellectual Masturbation (I’m Going to Write About Sex More)</a
  ><a
    href="https://grace.substack.com/p/intellectual-masturbation-im-going"
    class="post-preview-description"
    >I’ve been busy moving house the last couple of weeks, and so not as good at
    writing posts as I usually have been. Sorry about that. One of my goals
    for…</a
  ><a
    href="https://grace.substack.com/p/the-latest-star-wars-disappointed"
    class="post-preview-title newsletter"
    >The Latest Star Wars: Disappointed Fandom vs. Disappointed Criticism</a
  ><a
    href="https://grace.substack.com/p/the-latest-star-wars-disappointed"
    class="post-preview-description"
    >Neither of us liked the latest Star Wars, but for different reasons</a
  ><a
    href="https://grace.substack.com/p/it-takes-a-tough-man-to-make-a-tender"
    class="post-preview-title newsletter"
    >It takes a tough man to make a tender chicken</a
  ><a
    href="https://grace.substack.com/p/it-takes-a-tough-man-to-make-a-tender"
    class="post-preview-description"
    >Forgive me, I’ve been thinking about this tough man again: It takes a tough
    man to make a tender chicken It takes a tough man to make a tender
    breakfast…</a
  ><a
    href="https://grace.substack.com/p/happy-holidays-everyone"
    class="post-preview-title newsletter"
    >Happy Holidays, Everyone</a
  ><a
    href="https://grace.substack.com/p/happy-holidays-everyone"
    class="post-preview-description"
    >secret origin as theory of interpretation</a
  ><a
    href="https://grace.substack.com/p/some-promises-i-made-yesterday"
    class="post-preview-title newsletter"
    >Some Promises I Made Yesterday </a
  ><a
    href="https://grace.substack.com/p/some-promises-i-made-yesterday"
    class="post-preview-description"
    >apologies for being more than usually inattentive of my newsletter over the
    last week or so: you see I got married yesterday, and I’m moving to New
    York…</a
  ><a
    href="https://grace.substack.com/p/what-i-said-to-the-new-york-times"
    class="post-preview-title newsletter"
    >What I Said to the New York Times</a
  ><a
    href="https://grace.substack.com/p/what-i-said-to-the-new-york-times"
    class="post-preview-description"
    >https://www.nytimes.com/2019/12/18/opinion/transgender-rights-democrats.html
    Hey all, I’m cited in the New York Times today, in an opinion article by…</a
  ><a
    href="https://grace.substack.com/p/troll-anatomizin"
    class="post-preview-title newsletter"
    >Troll Anatomizin’</a
  ><a
    href="https://grace.substack.com/p/troll-anatomizin"
    class="post-preview-description"
    >the tale of Ranma</a
  ><a
    href="https://grace.substack.com/p/what-is-a-take-a-trans-feminist-take"
    class="post-preview-title newsletter"
    >What Is a Take? A Trans Feminist Take on the 2019 British Election Results </a
  ><a
    href="https://grace.substack.com/p/what-is-a-take-a-trans-feminist-take"
    class="post-preview-description"
    >Okay, I’ll bite, as they say. I have been on Twitter with any regularity
    for no more than eighteen months, so I’m a certain sense I’m still very new
    to…</a
  ><a
    href="https://grace.substack.com/p/grace-on-the-run"
    class="post-preview-title newsletter"
    >Grace on the Run</a
  ><a
    href="https://grace.substack.com/p/grace-on-the-run"
    class="post-preview-description"
    >(...Danny and Grace on the run...)</a
  ><a
    href="https://grace.substack.com/p/note-on-hoaxes-final-obituary-for"
    class="post-preview-title newsletter"
    >Note on Hoaxes (Final Obituary for Dickory Nixon)</a
  ><a
    href="https://grace.substack.com/p/note-on-hoaxes-final-obituary-for"
    class="post-preview-description"
    >One of my favorite anecdotes from my book Quaint, Exquisite, concerns the
    first major Japanese-Anglophone poet, Yone Noguchi. Noguchi published
    his…</a
  ><a
    href="https://grace.substack.com/p/danny-lavery"
    class="post-preview-title newsletter"
    >Danny Lavery</a
  ><a
    href="https://grace.substack.com/p/danny-lavery"
    class="post-preview-description"
    >so weird that my favorite writer has my surname now</a
  ><a
    href="https://grace.substack.com/p/a-spoofist-confesses"
    class="post-preview-title newsletter"
    >A Spoofist Confesses</a
  ><a
    href="https://grace.substack.com/p/a-spoofist-confesses"
    class="post-preview-description"
    >Dear friends, I had not expected to write a note of this kind, but I feel
    obliged to confess that the piece that I published here yesterday, “One
    Less…</a
  ><a
    href="https://grace.substack.com/p/one-less-enfant-terrible-to-kick"
    class="post-preview-title newsletter"
    >One Less Enfant Terrible to Kick Around</a
  ><a
    href="https://grace.substack.com/p/one-less-enfant-terrible-to-kick"
    class="post-preview-description"
    >The announcement last week from the young British trans writer Dickory
    Nixon that she was quitting Twitter and would not deliver the book
    manuscript for…</a
  ><a
    href="https://grace.substack.com/p/some-news-"
    class="post-preview-title newsletter"
    >some news 💘</a
  ><a
    href="https://grace.substack.com/p/some-news-"
    class="post-preview-description"
    >with thanks to Poppers the Pony</a
  ><a
    href="https://grace.substack.com/p/forty-very-bad-anti-therapy-takes"
    class="post-preview-title newsletter"
    >Forty Very Bad Anti-Therapy Takes You Might Enjoy Mulling Over</a
  ><a
    href="https://grace.substack.com/p/forty-very-bad-anti-therapy-takes"
    class="post-preview-description"
    >https://www.newstatesman.com/politics/health/2019/07/how-mindfulness-privatised-social-problem
    Therapy is so self-indulgent. Why don’t people think of…</a
  ><a
    href="https://grace.substack.com/p/november-round-up-and-october-and"
    class="post-preview-title newsletter"
    >November Round-Up (and October... and September) </a
  ><a
    href="https://grace.substack.com/p/november-round-up-and-october-and"
    class="post-preview-description"
    >Dear friends, It’s been such a remarkably strange month. I spent the first
    half of it choking with rage about very small things, and then the
    second…</a
  ><a
    href="https://grace.substack.com/p/a-short-note-on-community"
    class="post-preview-title newsletter"
    >A Short Note on Community </a
  ><a
    href="https://grace.substack.com/p/a-short-note-on-community"
    class="post-preview-description"
    >I wanted to write something short to acknowledge and thank all the people
    who subscribed to the newsletter yesterday. The rush took me by surprise.
    For…</a
  ><a
    href="https://grace.substack.com/p/grace-in-love"
    class="post-preview-title newsletter"
    >Grace in Love</a
  ><a
    href="https://grace.substack.com/p/grace-in-love"
    class="post-preview-description"
    >Those of you who have read The Shatner Chatner today will know the reason
    for the shakiness of these past couple of weeks: we have decided to break
    ties…</a
  ><a
    href="https://grace.substack.com/p/bojack-horseman-the-romance-of-depression"
    class="post-preview-title newsletter"
    >Bojack Horseman, the Romance of Depression, and Our Fuckable Furry
    Friends</a
  ><a
    href="https://grace.substack.com/p/bojack-horseman-the-romance-of-depression"
    class="post-preview-description"
    >I suppose I must have watched the first season of Bojack Horseman in 2014,
    but it didn’t run me over. The following summer I was in Osaka, for what
    was…</a
  ><a
    href="https://grace.substack.com/p/the-event-and-shit"
    class="post-preview-title newsletter"
    >the event and shit </a
  ><a
    href="https://grace.substack.com/p/the-event-and-shit"
    class="post-preview-description"
    >I have written a little before about my phobic relation with shit, but it’s
    on my mind again this morning. A few years ago, I was laid up for a few…</a
  ><a
    href="https://grace.substack.com/p/brief-travel-hiatus"
    class="post-preview-title newsletter"
    >brief travel hiatus!</a
  ><a
    href="https://grace.substack.com/p/brief-travel-hiatus"
    class="post-preview-description"
    >Dear reading public, I’m going Off The Grid for a few days while I’m
    traveling - back next week. Have a great week out there in Mirrorland. Grace
    xoxo</a
  ><a
    href="https://grace.substack.com/p/rage-concluded-a-one-year-anniversary"
    class="post-preview-title newsletter"
    >Rage, Concluded (A One-Year Anniversary Special)</a
  ><a
    href="https://grace.substack.com/p/rage-concluded-a-one-year-anniversary"
    class="post-preview-description"
    >I’m tired of thinking and feeling my way through rage, but having been
    writing about nothing else for a week, I’ve felt myself bludgeoned by my own
    rage…</a
  ><a
    href="https://grace.substack.com/p/another-a-fragment-on-rage"
    class="post-preview-title newsletter"
    >Another a Fragment on Rage</a
  ><a
    href="https://grace.substack.com/p/another-a-fragment-on-rage"
    class="post-preview-description"
    >I wrote last week about Susan Stryker’s relationship with rage, as
    exemplified in her Frankenstein piece. Specifically, I noted that the term
    “rage…</a
  ><a
    href="https://grace.substack.com/p/bat-out-of-hell"
    class="post-preview-title newsletter"
    >Bat Out of Hell</a
  ><a
    href="https://grace.substack.com/p/bat-out-of-hell"
    class="post-preview-description"
    >On Susan Stryker</a
  ><a
    href="https://grace.substack.com/p/notability-criteria"
    class="post-preview-title newsletter"
    >Notability Criteria</a
  ><a
    href="https://grace.substack.com/p/notability-criteria"
    class="post-preview-description"
    >For my part, I shall admit the joke I made on Twitter - “fucking make me a
    Wikipedia page you cowards” - was of that craven variety whereby, were
    anyone…</a
  ><a
    href="https://grace.substack.com/p/so-honest"
    class="post-preview-title newsletter"
    >So. Honest. </a
  ><a
    href="https://grace.substack.com/p/so-honest"
    class="post-preview-description"
    >Someone came to my office for the first time recently and mentioned that
    she was intimidated to be doing so. This, sadly, is not an infrequent…</a
  ><a
    href="https://grace.substack.com/p/the-old-school-transsexual-and-the"
    class="post-preview-title newsletter"
    >The Old-School Transsexual and the Working-Class Drag Queen</a
  ><a
    href="https://grace.substack.com/p/the-old-school-transsexual-and-the"
    class="post-preview-description"
    >I assume that those who read this newsletter will divide fairly evenly into
    a group who has no idea who “Contrapoints” is, and a group who are very…</a
  ><a
    href="https://grace.substack.com/p/cancel-me-until-i-bleed-sugar-free"
    class="post-preview-title newsletter"
    >Cancel Me Until I Bleed Sugar-Free Red Bull</a
  ><a
    href="https://grace.substack.com/p/cancel-me-until-i-bleed-sugar-free"
    class="post-preview-description"
    >It seems as though this was the week that “cancel culture” articles reached
    a certain kind of peak. President Obama expressed his concern about it;
    and…</a
  ><a
    href="https://grace.substack.com/p/a-dick-is-not-a-smoking-gun"
    class="post-preview-title newsletter"
    >A Dick Is Not a Smoking Gun</a
  ><a
    href="https://grace.substack.com/p/a-dick-is-not-a-smoking-gun"
    class="post-preview-description"
    >I worry that I talk about dicks too much, first of all. Aren’t we all bored
    of each other’s genitals? And the genitalization of trans people is…</a
  ><a
    href="https://grace.substack.com/p/get-you-an-app-that-tells-it-like"
    class="post-preview-title newsletter"
    >Get You an App That Tells It Like It Is</a
  ><a
    href="https://grace.substack.com/p/get-you-an-app-that-tells-it-like"
    class="post-preview-description"
    >if the Enneagram is going to slack off, I’ll do the job myself</a
  ><a
    href="https://grace.substack.com/p/t4t-wedding-prehistory-snaps-part"
    class="post-preview-title newsletter"
    >T4T Wedding Prehistory Snaps, Part II</a
  ><a
    href="https://grace.substack.com/p/t4t-wedding-prehistory-snaps-part"
    class="post-preview-description"
    >more of this! more of this!</a
  ><a
    href="https://grace.substack.com/p/the-most-embarrassing-charisma-of"
    class="post-preview-title newsletter"
    >The Most Embarrassing Charisma of All</a
  ><a
    href="https://grace.substack.com/p/the-most-embarrassing-charisma-of"
    class="post-preview-description"
    >In March 2008, it was my turn to take part in the annual ritual of graduate
    recruitment, whereby graduate programs, hitherto entirely anonymized and…</a
  ><a
    href="https://grace.substack.com/p/transition-is-not-a-theory-from-performativity"
    class="post-preview-title newsletter"
    >Transition Is Not a Theory: From Performativity to Technique</a
  ><a
    href="https://grace.substack.com/p/transition-is-not-a-theory-from-performativity"
    class="post-preview-description"
    >text of a talk delivered remotely at the Modernist Studies Association
    conference this morning</a
  ><a
    href="https://grace.substack.com/p/how-to-fight-about-twilight-after"
    class="post-preview-title newsletter"
    >How to Fight about Twilight After Your Sex Change: A Conversation With
    Daniel Ortberg, Part II</a
  ><a
    href="https://grace.substack.com/p/how-to-fight-about-twilight-after"
    class="post-preview-description"
    >This is the second part of a conversation that Danny and I started over on
    The Shatner Chatner. Read that bit, and then read this. * * * Daniel
    Mallory…</a
  ><a
    href="https://grace.substack.com/p/things-to-say-if-you-are-str8-and"
    class="post-preview-title newsletter"
    >Things to Say if You Are Str8 and Want to Have Sex</a
  ><a
    href="https://grace.substack.com/p/things-to-say-if-you-are-str8-and"
    class="post-preview-description"
    >a little guide to having punctual, heterosexual intercouse</a
  ><a
    href="https://grace.substack.com/p/force-yourself-to-say-nice-things"
    class="post-preview-title newsletter"
    >Force Yourself to Say Nice Things About Andrew Lloyd-Webber, You Coward</a
  ><a
    href="https://grace.substack.com/p/force-yourself-to-say-nice-things"
    class="post-preview-description"
    >I’ve written on here before about my love of D. A. Miller’s book about
    Broadway musicals; you may infer that I am a Sondheim fan, and I assume it
    is no…</a
  ><a
    href="https://grace.substack.com/p/guitarists-we-know-by-their-surname"
    class="post-preview-title newsletter"
    >Guitarists We Know By Their Surname</a
  ><a
    href="https://grace.substack.com/p/guitarists-we-know-by-their-surname"
    class="post-preview-description"
    >I’m practicing writing like a man because I am in boy drag while I
    travel.</a
  ><a
    href="https://grace.substack.com/p/my-beauty"
    class="post-preview-title newsletter"
    >My Beauty</a
  ><a
    href="https://grace.substack.com/p/my-beauty"
    class="post-preview-description"
    >In praise of Kevin Rowland's 1999 album "My Beauty," the greatest album of
    the 90s</a
  ><a
    href="https://grace.substack.com/p/i-wish-i-knew-less-about-blur"
    class="post-preview-title newsletter"
    >I Wish I Knew Less About Blur</a
  ><a
    href="https://grace.substack.com/p/i-wish-i-knew-less-about-blur"
    class="post-preview-description"
    >Knowledge is an asymmetric activity, which presents the following problem:
    it is eminently easier to find out what one wishes to know, than to
    bring…</a
  ><a
    href="https://grace.substack.com/p/no-womb-bukkake-treasury"
    class="post-preview-title newsletter"
    >No Womb (Bukkake Treasury)</a
  ><a
    href="https://grace.substack.com/p/no-womb-bukkake-treasury"
    class="post-preview-description"
    >The psychic effect of hormonal replacement therapy was, as I’ve written
    before, almost immediate: within forty-eight hours I had bought an oil
    diffuser…</a
  ><a
    href="https://grace.substack.com/p/why-i-am-such-a-bad-writer"
    class="post-preview-title newsletter"
    >Why I Am Such A Bad Writer</a
  ><a
    href="https://grace.substack.com/p/why-i-am-such-a-bad-writer"
    class="post-preview-description"
    >Recently, I’ve been experiencing something unusual - a real depletion in my
    faith in my writing, in the pleasure I’m able to take from it. This is a…</a
  ><a
    href="https://grace.substack.com/p/star-trek-xi-sara-versus-isaac"
    class="post-preview-title newsletter"
    >Star Trek XI: Sara Versus Isaac</a
  ><a
    href="https://grace.substack.com/p/star-trek-xi-sara-versus-isaac"
    class="post-preview-description"
    >it's a romulan-vs-federation set-to and anything can happen</a
  ><a
    href="https://grace.substack.com/p/four-words-for-any-potentially-tricky"
    class="post-preview-title newsletter"
    >Four Words for Any Potentially Tricky Historical or Political Problem</a
  ><a
    href="https://grace.substack.com/p/four-words-for-any-potentially-tricky"
    class="post-preview-description"
    >avow your own orthodoxies my friends</a
  ><a
    href="https://grace.substack.com/p/a-prehistory-of-grace-part-iii-grad"
    class="post-preview-title newsletter"
    >A Prehistory of Grace, Part III: Grad School Edition</a
  ><a
    href="https://grace.substack.com/p/a-prehistory-of-grace-part-iii-grad"
    class="post-preview-description"
    >memory</a
  ><a
    href="https://grace.substack.com/p/laura-dern-loves-to-watch-machines"
    class="post-preview-title newsletter"
    >Laura Dern Loves to Watch Machines Washing Her Car</a
  ><a
    href="https://grace.substack.com/p/laura-dern-loves-to-watch-machines"
    class="post-preview-description"
    >they remind her of when she was young</a
  ><a
    href="https://grace.substack.com/p/reading-kant-with-your-college-boyfriend"
    class="post-preview-title newsletter"
    >Reading Kant With Your College Boyfriend, Part I</a
  ><a
    href="https://grace.substack.com/p/reading-kant-with-your-college-boyfriend"
    class="post-preview-description"
    >Two things happened on the feminist internet last week that converged on
    Immanuel Kant and college boyfriends. The first was on my beloved friend
    Nicole…</a
  ><a
    href="https://grace.substack.com/p/singing-lessons"
    class="post-preview-title newsletter"
    >Singing Lessons</a
  ><a
    href="https://grace.substack.com/p/singing-lessons"
    class="post-preview-description"
    >a note on /Daniel Deronda/</a
  ><a
    href="https://grace.substack.com/p/august-round-up"
    class="post-preview-title newsletter"
    >August Round-Up</a
  ><a
    href="https://grace.substack.com/p/august-round-up"
    class="post-preview-description"
    >summer stillness</a
  ><a
    href="https://grace.substack.com/p/gum"
    class="post-preview-title newsletter"
    >Gum</a
  ><a href="https://grace.substack.com/p/gum" class="post-preview-description"
    >everywhere a gum gum</a
  ><a
    href="https://grace.substack.com/p/from-promising-to-overrated-the-grace"
    class="post-preview-title newsletter"
    >From Promising to Overrated: the Grace Lavery Story</a
  ><a
    href="https://grace.substack.com/p/from-promising-to-overrated-the-grace"
    class="post-preview-description"
    >Pretty much everyone I dislike in the world has something in common: at
    some point in the past, l beat them in some competition or other. (I
    don’t…</a
  ><a
    href="https://grace.substack.com/p/with-paul-saint-amour-still-weak"
    class="post-preview-title newsletter"
    >(with Paul Saint-Amour) Still Weak After All These Years </a
  ><a
    href="https://grace.substack.com/p/with-paul-saint-amour-still-weak"
    class="post-preview-description"
    >our response to responses to a fairly responsive set of critical
    responses</a
  ><a
    href="https://grace.substack.com/p/the-bridal-shower"
    class="post-preview-title newsletter"
    >The Bridal Shower</a
  ><a
    href="https://grace.substack.com/p/the-bridal-shower"
    class="post-preview-description"
    >// sisterhood and sexuality // some feelings and fragments</a
  ><a
    href="https://grace.substack.com/p/fears-list-for-the-bridal-shower"
    class="post-preview-title newsletter"
    >Fears List for the Bridal Shower (Which Is Tomorrow)</a
  ><a
    href="https://grace.substack.com/p/fears-list-for-the-bridal-shower"
    class="post-preview-description"
    >👰🧖‍♀️🙀👰🧖‍♀️🙀👰🧖‍♀️🙀👰🧖‍♀️🙀👰🧖‍♀️🙀👰🧖‍♀️🙀</a
  ><a
    href="https://grace.substack.com/p/fears-list-for-the-wedding"
    class="post-preview-title newsletter"
    >Fears List for the Wedding</a
  ><a
    href="https://grace.substack.com/p/fears-list-for-the-wedding"
    class="post-preview-description"
    >😬😬😬😬😬😬😬😮😮😮😮👩‍🔬👸</a
  ><a
    href="https://grace.substack.com/p/a-free-speech-theodicy-for-the-british"
    class="post-preview-title newsletter"
    >A Free Speech Theodicy for the British Male Intellectual </a
  ><a
    href="https://grace.substack.com/p/a-free-speech-theodicy-for-the-british"
    class="post-preview-description"
    >One passage from the Australian philosopher J. L. Mackie’s essay on the
    problem of human evil always sticks with me: If God has made men such that
    in…</a
  ><a
    href="https://grace.substack.com/p/star-trek-tng-ccg-tarot-experiment"
    class="post-preview-title newsletter"
    >Star Trek: TNG CCG Tarot Experiment</a
  ><a
    href="https://grace.substack.com/p/star-trek-tng-ccg-tarot-experiment"
    class="post-preview-description"
    >At some point, I suppose, it is impossible to disentangle lyricism from
    embarrassment. That jejune insight brought to you by a recent return to
    a…</a
  ><a
    href="https://grace.substack.com/p/appassionata-dentata-part-ii"
    class="post-preview-title newsletter"
    >Appassionata Dentata, Part II</a
  ><a
    href="https://grace.substack.com/p/appassionata-dentata-part-ii"
    class="post-preview-description"
    >feat. CHET SEAFOOD: QUEER PORN</a
  ><a
    href="https://grace.substack.com/p/i-quit-and-she-slammed-the-door"
    class="post-preview-title newsletter"
    >I Quit! And She Slammed the Door</a
  ><a
    href="https://grace.substack.com/p/i-quit-and-she-slammed-the-door"
    class="post-preview-description"
    >I’ve passed some kind of threshold over the last few days: I no longer want
    to engage in public debate on trans issues with gender critical
    academics…</a
  ><a
    href="https://grace.substack.com/p/july-round-up"
    class="post-preview-title newsletter"
    >July Round-Up</a
  ><a
    href="https://grace.substack.com/p/july-round-up"
    class="post-preview-description"
    >"july" is a pretty word</a
  ><a
    href="https://grace.substack.com/p/a-troubled-diva-writes-about-sunglasses"
    class="post-preview-title newsletter"
    >A Troubled Diva Writes About Sunglasses At Last</a
  ><a
    href="https://grace.substack.com/p/a-troubled-diva-writes-about-sunglasses"
    class="post-preview-description"
    >pity and adore the troubled diva; worship her and be bored by her default
    to cliché</a
  ><a
    href="https://grace.substack.com/p/t4t-love-letters-about-transmisogyny"
    class="post-preview-title newsletter"
    >T4T Love Letters about Transmisogyny and Sin</a
  ><a
    href="https://grace.substack.com/p/t4t-love-letters-about-transmisogyny"
    class="post-preview-description"
    >The other day, D. was writing something about Mary and Martha, and asked me
    to read part of it over. He was concerned that he had become excessively…</a
  ><a
    href="https://grace.substack.com/p/coke-theoryweed-theory-and-some-possible"
    class="post-preview-title newsletter"
    >Coke Theory/Weed Theory, and Some Possible Alternatives</a
  ><a
    href="https://grace.substack.com/p/coke-theoryweed-theory-and-some-possible"
    class="post-preview-description"
    >// cocaine includes crack (obviously) and weed includes hash and skunk
    (also obviously) //</a
  ><a
    href="https://grace.substack.com/p/the-james-brokenshire-tendency-plays"
    class="post-preview-title newsletter"
    >THE JAMES BROKENSHIRE TENDENCY PLAYS ITS HAND</a
  ><a
    href="https://grace.substack.com/p/the-james-brokenshire-tendency-plays"
    class="post-preview-description"
    >we're here, we're broken, and we fuckin hate you</a
  ><a
    href="https://grace.substack.com/p/dont-pick-up-hitchhikers-in-calabasas-4cd"
    class="post-preview-title newsletter"
    >Don’t Pick Up Hitchhikers in Calabasas, Part II</a
  ><a
    href="https://grace.substack.com/p/dont-pick-up-hitchhikers-in-calabasas-4cd"
    class="post-preview-description"
    >For the last twenty-four hours, Danny and I have been staying in Avalon, on
    Santa Catalina island, an island situated an hour or so off the coast of
    Los…</a
  ><a
    href="https://grace.substack.com/p/dont-pick-up-hitchhikers-in-calabasas"
    class="post-preview-title newsletter"
    >Don’t Pick Up Hitchhikers in Calabasas, Part One</a
  ><a
    href="https://grace.substack.com/p/dont-pick-up-hitchhikers-in-calabasas"
    class="post-preview-description"
    >Danny and I are in Southern California for a few days for his grandfather’s
    funeral, and we’re taking the time to drive around the area a little bit…</a
  ><a
    href="https://grace.substack.com/p/alien-erotica-beach-frenching"
    class="post-preview-title newsletter"
    >Alien Erotica: Beach Frenching</a
  ><a
    href="https://grace.substack.com/p/alien-erotica-beach-frenching"
    class="post-preview-description"
    >first attempt to write pornography, wish me luck</a
  ><a
    href="https://grace.substack.com/p/the-rare-mystery-of-female-socialization"
    class="post-preview-title newsletter"
    >The Rare Mystery of Female Socialization, Concluded: A Chat With Daniel
    Ortberg</a
  ><a
    href="https://grace.substack.com/p/the-rare-mystery-of-female-socialization"
    class="post-preview-description"
    >HOLMES HOLMES WATSON WATSON</a
  ><a
    href="https://grace.substack.com/p/seventy-one-stories-about-being-trans"
    class="post-preview-title newsletter"
    >Seventy-One Stories About Being Trans in School</a
  ><a
    href="https://grace.substack.com/p/seventy-one-stories-about-being-trans"
    class="post-preview-description"
    >two suggestions, and a criticism</a
  ><a
    href="https://grace.substack.com/p/help-im-turning-into-my-grandmother"
    class="post-preview-title newsletter"
    >Help, I’m Turning Into My Grandmother</a
  ><a
    href="https://grace.substack.com/p/help-im-turning-into-my-grandmother"
    class="post-preview-description"
    >spoiler alert: my grandmother was often unpleasant</a
  ><a
    href="https://grace.substack.com/p/one-weird-trick-you-can-play-on-your"
    class="post-preview-title newsletter"
    >One Weird Trick You Can Play On Your Endocrine System</a
  ><a
    href="https://grace.substack.com/p/one-weird-trick-you-can-play-on-your"
    class="post-preview-description"
    >and an analogy about make-up</a
  ><a
    href="https://grace.substack.com/p/which-is-better-british-beer-or-american"
    class="post-preview-title newsletter"
    >Which Is Better, British Beer or American Beer?</a
  ><a
    href="https://grace.substack.com/p/which-is-better-british-beer-or-american"
    class="post-preview-description"
    >finally the fight is enjoined</a
  ><a
    href="https://grace.substack.com/p/a-generational-provocation"
    class="post-preview-title newsletter"
    >A Generational Provocation</a
  ><a
    href="https://grace.substack.com/p/a-generational-provocation"
    class="post-preview-description"
    >olds these days just can't take criticism</a
  ><a
    href="https://grace.substack.com/p/chromosome-fairy-tales"
    class="post-preview-title newsletter"
    >Chromosome Fairy Tales</a
  ><a
    href="https://grace.substack.com/p/chromosome-fairy-tales"
    class="post-preview-description"
    >how have our ideas about chromosomes changed since ancient days</a
  ><a
    href="https://grace.substack.com/p/on-perkiness"
    class="post-preview-title newsletter"
    >On Perkiness</a
  ><a
    href="https://grace.substack.com/p/on-perkiness"
    class="post-preview-description"
    >marking another growth spurt and a pair of new bras</a
  ><a
    href="https://grace.substack.com/p/trans-abstractions-a-conversation"
    class="post-preview-title newsletter"
    >Trans Abstractions: A Conversation With Ray Briggs</a
  ><a
    href="https://grace.substack.com/p/trans-abstractions-a-conversation"
    class="post-preview-description"
    >once more unto the breach dear friends</a
  ><a
    href="https://grace.substack.com/p/june-round-up"
    class="post-preview-title newsletter"
    >June Round Up</a
  ><a
    href="https://grace.substack.com/p/june-round-up"
    class="post-preview-description"
    >thank you once more friends</a
  ><a
    href="https://grace.substack.com/p/skins-fourth-generation"
    class="post-preview-title newsletter"
    >Skins: Fourth Generation</a
  ><a
    href="https://grace.substack.com/p/skins-fourth-generation"
    class="post-preview-description"
    >a proposal for more Skins</a
  ><a
    href="https://grace.substack.com/p/we-can-never-go-back-to-before"
    class="post-preview-title newsletter"
    >We Can Never Go Back to Before</a
  ><a
    href="https://grace.substack.com/p/we-can-never-go-back-to-before"
    class="post-preview-description"
    >When Danny and I were in Paris last month, I got to hang out with an old
    friend, M., whom I hadn’t seen in a decade or so. M. lives in New York but
    we…</a
  ><a
    href="https://grace.substack.com/p/alive-in-philadelphia"
    class="post-preview-title newsletter"
    >Alive in Philadelphia </a
  ><a
    href="https://grace.substack.com/p/alive-in-philadelphia"
    class="post-preview-description"
    >does it count as travel writing if the main things are “I used to live
    here” and “I am still alive”</a
  ><a
    href="https://grace.substack.com/p/everyone-is-trans-dont-worry-about"
    class="post-preview-title newsletter"
    >Everyone Is Trans, Don't Worry About It!</a
  ><a
    href="https://grace.substack.com/p/everyone-is-trans-dont-worry-about"
    class="post-preview-description"
    >you, me, Gyles Brandreth, Gretchen Carlson, Namor the Sub-Mariner</a
  ><a
    href="https://grace.substack.com/p/things-you-have-to-do-before-you"
    class="post-preview-title newsletter"
    >Things You Have To Do Before You Deliver Brexit (Which You Have To Do)</a
  ><a
    href="https://grace.substack.com/p/things-you-have-to-do-before-you"
    class="post-preview-description"
    >it’s all on you now</a
  ><a
    href="https://grace.substack.com/p/hippies-versus-puritans-fight"
    class="post-preview-title newsletter"
    >Hippies Versus Puritans! Fight!</a
  ><a
    href="https://grace.substack.com/p/hippies-versus-puritans-fight"
    class="post-preview-description"
    >some unfortunate encounters with political theory</a
  ><a
    href="https://grace.substack.com/p/some-provisional-thoughts-on-what"
    class="post-preview-title newsletter"
    >Some Provisional Thoughts on What I Might Do With My Genitals One Day</a
  ><a
    href="https://grace.substack.com/p/some-provisional-thoughts-on-what"
    class="post-preview-description"
    >junk chat</a
  ><a
    href="https://grace.substack.com/p/questions-you-can-ask-my-boyfriend"
    class="post-preview-title newsletter"
    >Questions You Can Ask My Boyfriend About the Batman Franchise If You Want
    to See Him Vibrate in Anger and Confusion</a
  ><a
    href="https://grace.substack.com/p/questions-you-can-ask-my-boyfriend"
    class="post-preview-description"
    >i’m the comics one and he’s the Star Wars one</a
  ><a
    href="https://grace.substack.com/p/a-prehistory-of-grace-part-ii"
    class="post-preview-title newsletter"
    >A Prehistory of Grace, Part II</a
  ><a
    href="https://grace.substack.com/p/a-prehistory-of-grace-part-ii"
    class="post-preview-description"
    >"fuckin heavy ain't it," as Kevin Rowland says</a
  ><a
    href="https://grace.substack.com/p/a-prehistory-of-grace"
    class="post-preview-title newsletter"
    >A Prehistory of Grace</a
  ><a
    href="https://grace.substack.com/p/a-prehistory-of-grace"
    class="post-preview-description"
    >looking at an old photograph and feeling some feelings about it</a
  ><a
    href="https://grace.substack.com/p/last-night-i-was-murdered-by-a-blend"
    class="post-preview-title newsletter"
    >Last Night I Was Murdered by a Blend Of Chloë Sevigny, Miranda Hart, Ezra
    Miller, and Jonah from Veep</a
  ><a
    href="https://grace.substack.com/p/last-night-i-was-murdered-by-a-blend"
    class="post-preview-description"
    >transcription of a real nightmare</a
  ><a
    href="https://grace.substack.com/p/know-your-chromosomes"
    class="post-preview-title newsletter"
    >Know Your Chromosomes!</a
  ><a
    href="https://grace.substack.com/p/know-your-chromosomes"
    class="post-preview-description"
    >seriously, what on earth are you frightened of, you sniveling cowards</a
  ><a
    href="https://grace.substack.com/p/the-most-evil-human-being-i-have"
    class="post-preview-title newsletter"
    >The Most Evil Human Being I Have Ever Met</a
  ><a
    href="https://grace.substack.com/p/the-most-evil-human-being-i-have"
    class="post-preview-description"
    >how I came to leave Paris in 2008</a
  ><a
    href="https://grace.substack.com/p/what-pride-means-to-me"
    class="post-preview-title newsletter"
    >What Pride Means to Me</a
  ><a
    href="https://grace.substack.com/p/what-pride-means-to-me"
    class="post-preview-description"
    >forgive me for suspending my snark, but the Gender Critical Hit Squad came
    for me this week and I’m feeling soft ok</a
  ><a
    href="https://grace.substack.com/p/may-round-up"
    class="post-preview-title newsletter"
    >May Round-Up</a
  ><a
    href="https://grace.substack.com/p/may-round-up"
    class="post-preview-description"
    >what a what a what a month it was</a
  ><a
    href="https://grace.substack.com/p/what-kind-of-fish-would-you-like"
    class="post-preview-title newsletter"
    >What Kind of Fish Would You Like Your Vagina To Be Made Out Of?</a
  ><a
    href="https://grace.substack.com/p/what-kind-of-fish-would-you-like"
    class="post-preview-description"
    >I mean, there are so many viable puns but I decided to go straight edge.
    Parkour!</a
  ><a
    href="https://grace.substack.com/p/quaint-exquisite-published-today"
    class="post-preview-title newsletter"
    >Quaint, Exquisite published today!</a
  ><a
    href="https://grace.substack.com/p/quaint-exquisite-published-today"
    class="post-preview-description"
    >shameless self-promotion from a professional self-promoter</a
  ><a
    href="https://grace.substack.com/p/binary-conversation-part-ii"
    class="post-preview-title newsletter"
    >binary conversation part II</a
  ><a
    href="https://grace.substack.com/p/binary-conversation-part-ii"
    class="post-preview-description"
    >Avoiding Trans Salvageableness and Transitioning As Little As Possible</a
  ><a
    href="https://grace.substack.com/p/kathleen-stock-on-jane-eyre"
    class="post-preview-title newsletter"
    >Kathleen Stock on /Jane Eyre/</a
  ><a
    href="https://grace.substack.com/p/kathleen-stock-on-jane-eyre"
    class="post-preview-description"
    >a correction/clarification/expansion/coda</a
  ><a
    href="https://grace.substack.com/p/you-keep-using-this-phrase-adult"
    class="post-preview-title newsletter"
    >You Keep Using This Phrase, “Adult Human Females” </a
  ><a
    href="https://grace.substack.com/p/you-keep-using-this-phrase-adult"
    class="post-preview-description"
    >A response conspicuously assuming the good faith of Kathleen Stock et.
    al.</a
  ><a
    href="https://grace.substack.com/p/getting-things-wrong-in-french-for"
    class="post-preview-title newsletter"
    >Getting Things Wrong (In French, for Example)</a
  ><a
    href="https://grace.substack.com/p/getting-things-wrong-in-french-for"
    class="post-preview-description"
    >in which our elegant traveler discloses deep personal anxieties</a
  ><a
    href="https://grace.substack.com/p/if-you-give-a-mouse-a-cookie-you"
    class="post-preview-title newsletter"
    >If You Give A Mouse a Cookie, You Feed Him For A Day</a
  ><a
    href="https://grace.substack.com/p/if-you-give-a-mouse-a-cookie-you"
    class="post-preview-description"
    >my slope is slippery but my heart is true</a
  ><a
    href="https://grace.substack.com/p/thursday-open-thread"
    class="post-preview-description"
    >Hey sports fans, Danny and I are still trying out this whole open thread
    thing, and this time we’re doing it here! So, if you feel like it, jump…</a
  ><a
    href="https://grace.substack.com/p/the-shore-is-more-real-than-the-tide"
    class="post-preview-title newsletter"
    >The Shore Is More Real Than the Tide</a
  ><a
    href="https://grace.substack.com/p/the-shore-is-more-real-than-the-tide"
    class="post-preview-description"
    >Browning, the Righteous Brothers, and Tennyson</a
  ><a
    href="https://grace.substack.com/p/articles-published-on-the-toast-that"
    class="post-preview-title newsletter"
    >Articles Published on The Toast That I Later Learned Were About Me, a
    Partial List</a
  ><a
    href="https://grace.substack.com/p/articles-published-on-the-toast-that"
    class="post-preview-description"
    >if daniel ortberg were your fiance</a
  ><a
    href="https://grace.substack.com/p/scattered-thoughts-on-caster-semenya"
    class="post-preview-title newsletter"
    >Scattered Thoughts on Caster Semenya</a
  ><a
    href="https://grace.substack.com/p/scattered-thoughts-on-caster-semenya"
    class="post-preview-description"
    >really more spluttering than a coherent take, tbh</a
  ><a
    href="https://grace.substack.com/p/it-was-only-a-bit-of-fun-and-whats"
    class="post-preview-title newsletter"
    >It Was Only a Bit of Fun, and What’s Wrong With That After All</a
  ><a
    href="https://grace.substack.com/p/it-was-only-a-bit-of-fun-and-whats"
    class="post-preview-description"
    >harmless</a
  ><a
    href="https://grace.substack.com/p/binary-vs-non-binary-the-worst-wwe"
    class="post-preview-title newsletter"
    >Binary vs. Non-Binary: The Worst WWE Smackdown Idea Ever</a
  ><a
    href="https://grace.substack.com/p/binary-vs-non-binary-the-worst-wwe"
    class="post-preview-description"
    >part two of a convo with mr. daniel alexander lammory ortbreg</a
  ><a
    href="https://grace.substack.com/p/piper-perabo-keane-tattooing"
    class="post-preview-title newsletter"
    >Piper Perabo, Keane, Tattooing</a
  ><a
    href="https://grace.substack.com/p/piper-perabo-keane-tattooing"
    class="post-preview-description"
    >the aesthetics of irreversibility</a
  ><a
    href="https://grace.substack.com/p/how-i-won-my-courageous-and-inspirational"
    class="post-preview-title newsletter"
    >How I Won My Courageous and Inspirational Battle With Jolly Ranchers
    Chews</a
  ><a
    href="https://grace.substack.com/p/how-i-won-my-courageous-and-inspirational"
    class="post-preview-description"
    >significantly more intense than the jokey title makes it sound</a
  ><a
    href="https://grace.substack.com/p/april-round-up"
    class="post-preview-title newsletter"
    >April Round-Up</a
  ><a
    href="https://grace.substack.com/p/april-round-up"
    class="post-preview-description"
    >things I put out in April</a
  ><a
    href="https://grace.substack.com/p/lady-gaga-pizza-owl-a-few-random"
    class="post-preview-title newsletter"
    >Lady Gaga, Pizza Owl, a Few Random Things</a
  ><a
    href="https://grace.substack.com/p/lady-gaga-pizza-owl-a-few-random"
    class="post-preview-description"
    >grab bag</a
  ><a
    href="https://grace.substack.com/p/is-shane-actually-butch-and-other"
    class="post-preview-title newsletter"
    >“Is Shane Actually Butch?,” and Other Unanswered Questions about Butchness
    and Transmasculinity: A Conversation with Daniel Ortberg, Molly…</a
  ><a
    href="https://grace.substack.com/p/is-shane-actually-butch-and-other"
    class="post-preview-description"
    >strangely coincides with that shitty AE piece, but not actually about it
    very much</a
  ><a
    href="https://grace.substack.com/p/english-courses-you-might-consider"
    class="post-preview-title newsletter"
    >English Courses You Might Consider Teaching If You Are Looking for a
    Wife</a
  ><a
    href="https://grace.substack.com/p/english-courses-you-might-consider"
    class="post-preview-description"
    >just put a message into the universe and see what comes back for you</a
  ><a
    href="https://grace.substack.com/p/michel-sardou-tre-une-femme-"
    class="post-preview-title newsletter"
    >Michel Sardou, "Être une femme" (1981)</a
  ><a
    href="https://grace.substack.com/p/michel-sardou-tre-une-femme-"
    class="post-preview-description"
    >sarcasm is a two way street, sucker</a
  ><a
    href="https://grace.substack.com/p/what-if-liking-the-beatles-were-an"
    class="post-preview-title newsletter"
    >What If Liking The Beatles Were An Interesting Personality Trait</a
  ><a
    href="https://grace.substack.com/p/what-if-liking-the-beatles-were-an"
    class="post-preview-description"
    >did you even fucking hear, jesus</a
  ><a
    href="https://grace.substack.com/p/theres-always-a-good-reason-to-wait"
    class="post-preview-title newsletter"
    >There’s Always a Good Reason to Wait!</a
  ><a
    href="https://grace.substack.com/p/theres-always-a-good-reason-to-wait"
    class="post-preview-description"
    >in praise of the art of deferral</a
  ><a
    href="https://grace.substack.com/p/some-intimate-photographs-of-a-recently"
    class="post-preview-title newsletter"
    >Some Intimate Photographs of a Recently Tenured English Professor Lying
    Around Naked</a
  ><a
    href="https://grace.substack.com/p/some-intimate-photographs-of-a-recently"
    class="post-preview-description"
    >the privilege of tenure and my transsexual body</a
  ><a
    href="https://grace.substack.com/p/the-seven-of-wands-reversed"
    class="post-preview-title newsletter"
    >The Seven of Wands, Reversed</a
  ><a
    href="https://grace.substack.com/p/the-seven-of-wands-reversed"
    class="post-preview-description"
    >trans woman collaborates with evil empire for easy life</a
  ><a
    href="https://grace.substack.com/p/excerpted-lyrics-from-debate-me-the"
    class="post-preview-title newsletter"
    >Excerpted Lyrics from DEBATE ME! THE MUSICAL</a
  ><a
    href="https://grace.substack.com/p/excerpted-lyrics-from-debate-me-the"
    class="post-preview-description"
    >It’s West Side Story-meets-Newsies-meets-Assassins-meets-Seven Brides For
    Seven Brothers-meets-Starlight Express</a
  ><a
    href="https://grace.substack.com/p/trans-kids-these-days"
    class="post-preview-title newsletter"
    >Trans Kids These Days</a
  ><a
    href="https://grace.substack.com/p/trans-kids-these-days"
    class="post-preview-description"
    >Oedipalize Me Until I Arrive At Colonus Under My Own Illegitimate
    Authority</a
  ><a
    href="https://grace.substack.com/p/elword-law-part-"
    class="post-preview-title newsletter"
    >Elword Law: Part ☝️</a
  ><a
    href="https://grace.substack.com/p/elword-law-part-"
    class="post-preview-description"
    >a STAGE MIRROR special event with Christina Grace Tucker</a
  ><a
    href="https://grace.substack.com/p/so-you-have-gout-are-you-british"
    class="post-preview-title newsletter"
    >So, You Have Gout. Are You... British, By Any Chance?</a
  ><a
    href="https://grace.substack.com/p/so-you-have-gout-are-you-british"
    class="post-preview-description"
    >you know who had gout? your mom probably</a
  ><a
    href="https://grace.substack.com/p/jos-charles-feeld-2018"
    class="post-preview-title newsletter"
    >Jos Charles, /feeld/ (2018)</a
  ><a
    href="https://grace.substack.com/p/jos-charles-feeld-2018"
    class="post-preview-description"
    >a folde in a stitch</a
  ><a
    href="https://grace.substack.com/p/soup-a-discrimination"
    class="post-preview-title newsletter"
    >Soup: A Discrimination</a
  ><a
    href="https://grace.substack.com/p/soup-a-discrimination"
    class="post-preview-description"
    >lovers talking about soup and not quite agreeing</a
  ><a
    href="https://grace.substack.com/p/descartes-gland"
    class="post-preview-title newsletter"
    >Descartes’ Gland</a
  ><a
    href="https://grace.substack.com/p/descartes-gland"
    class="post-preview-description"
    >everybody’s got a thing</a
  ><a
    href="https://grace.substack.com/p/jennifer-i-write-in-haste-for-i-fear"
    class="post-preview-title newsletter"
    >Jennifer, I Write in Haste, for I Fear the Chromosomes Are Not Far Behind
    Me</a
  ><a
    href="https://grace.substack.com/p/jennifer-i-write-in-haste-for-i-fear"
    class="post-preview-description"
    >in which our hero seeks out his predecessors</a
  ><a
    href="https://grace.substack.com/p/the-knight-of-swords"
    class="post-preview-title newsletter"
    >The Knight of Swords</a
  ><a
    href="https://grace.substack.com/p/the-knight-of-swords"
    class="post-preview-description"
    >please ignore my book-plugging</a
  ><a
    href="https://grace.substack.com/p/appassionata-dentata"
    class="post-preview-title newsletter"
    >Appassionata Dentata</a
  ><a
    href="https://grace.substack.com/p/appassionata-dentata"
    class="post-preview-description"
    >a short history of some intense experiences I have had with dentists</a
  ><a
    href="https://grace.substack.com/p/so-you-accidentally-just-told-everyone"
    class="post-preview-title newsletter"
    >So, You Accidentally Just Told Everyone That You Are a Girl Now. Oops</a
  ><a
    href="https://grace.substack.com/p/so-you-accidentally-just-told-everyone"
    class="post-preview-description"
    >wygd??</a
  ><a
    href="https://grace.substack.com/p/lesbian-velocity-part-two"
    class="post-preview-title newsletter"
    >Lesbian Velocity, Part Two</a
  ><a
    href="https://grace.substack.com/p/lesbian-velocity-part-two"
    class="post-preview-description"
    >a conversation between Danny and Grace on a rather esoteric subject</a
  ><a
    href="https://grace.substack.com/p/march-round-up"
    class="post-preview-title newsletter"
    >March round-up</a
  ><a
    href="https://grace.substack.com/p/march-round-up"
    class="post-preview-description"
    >it's a round-up, it's March, and if you are reading this you are (I
    presume) still alive</a
  ><a
    href="https://grace.substack.com/p/update-on-sex"
    class="post-preview-title newsletter"
    >Update on Sex</a
  ><a
    href="https://grace.substack.com/p/update-on-sex"
    class="post-preview-description"
    >...and a little bit not.</a
  ><a
    href="https://grace.substack.com/p/father-dougal-is-a-trans-guy-and"
    class="post-preview-title newsletter"
    >Father Dougal Is a Trans Guy, and I'm Not Sure Ted Isn't Going to
    Transition Soon Too</a
  ><a
    href="https://grace.substack.com/p/father-dougal-is-a-trans-guy-and"
    class="post-preview-description"
    >these ones are small, and these ones are far away</a
  ><a
    href="https://grace.substack.com/p/elizabeth-barrett-browning-aurora"
    class="post-preview-title newsletter"
    >Elizabeth Barrett Browning, /Aurora Leigh/ (1856)</a
  ><a
    href="https://grace.substack.com/p/elizabeth-barrett-browning-aurora"
    class="post-preview-description"
    >lines addressed to a future self who no longer finds me charming</a
  ><a
    href="https://grace.substack.com/p/love-your-phases"
    class="post-preview-title newsletter"
    >Love Your Phases!</a
  ><a
    href="https://grace.substack.com/p/love-your-phases"
    class="post-preview-description"
    >the fear of the future and the fear of the present</a
  ><a
    href="https://grace.substack.com/p/jennifer-i-am-afraid-that-my-body"
    class="post-preview-title newsletter"
    >Jennifer, I Am Afraid That My Body Has Become Infested With Chromosomes,
    and I Can Never Return to Knutsford, Part One</a
  ><a
    href="https://grace.substack.com/p/jennifer-i-am-afraid-that-my-body"
    class="post-preview-description"
    >in which the case is outlined</a
  ><a
    href="https://grace.substack.com/p/candy-crack"
    class="post-preview-title newsletter"
    >Candy Crack</a
  ><a
    href="https://grace.substack.com/p/candy-crack"
    class="post-preview-description"
    >what if Johnny Cash had been addicted to iPhone games?</a
  ><a
    href="https://grace.substack.com/p/the-devil-inverted"
    class="post-preview-title newsletter"
    >The Devil, Inverted</a
  ><a
    href="https://grace.substack.com/p/the-devil-inverted"
    class="post-preview-description"
    >watch out 4 squirrel busters</a
  ><a
    href="https://grace.substack.com/p/the-ideal-airport"
    class="post-preview-title newsletter"
    >The Ideal Airport</a
  ><a
    href="https://grace.substack.com/p/the-ideal-airport"
    class="post-preview-description"
    >a transsexual situationist utopia written in the sky</a
  ><a
    href="https://grace.substack.com/p/welcome-to-being-a-woman"
    class="post-preview-title newsletter"
    >"Welcome to Being a Woman"</a
  ><a
    href="https://grace.substack.com/p/welcome-to-being-a-woman"
    class="post-preview-description"
    >letter from an ungrateful, entitled bitch</a
  ><a
    href="https://grace.substack.com/p/five-of-swords-a-victory-at-what"
    class="post-preview-title newsletter"
    >Five of Swords: A Victory, at What Price</a
  ><a
    href="https://grace.substack.com/p/five-of-swords-a-victory-at-what"
    class="post-preview-description"
    >flirtation, Marxism, and other game theories</a
  ><a
    href="https://grace.substack.com/p/scholarship-kids-of-the-world-what"
    class="post-preview-title newsletter"
    >Scholarship Kids of the World, What Are We Doing</a
  ><a
    href="https://grace.substack.com/p/scholarship-kids-of-the-world-what"
    class="post-preview-description"
    >100% admission, and everyone gets an A</a
  ><a
    href="https://grace.substack.com/p/the-opening-credits-of-the-flying"
    class="post-preview-title newsletter"
    >The Opening Credits of /The Flying Nun/ (1967 - 1970)</a
  ><a
    href="https://grace.substack.com/p/the-opening-credits-of-the-flying"
    class="post-preview-description"
    >a utopia, for women</a
  ><a
    href="https://grace.substack.com/p/literacy-and-pornography"
    class="post-preview-title newsletter"
    >Literacy and Pornography</a
  ><a
    href="https://grace.substack.com/p/literacy-and-pornography"
    class="post-preview-description"
    >a case against the British block</a
  ><a
    href="https://grace.substack.com/p/lets-talcc-about-dicc-interview-with"
    class="post-preview-title newsletter"
    >Let’s Talcc About Dicc: Interview with Madeleine Holden</a
  ><a
    href="https://grace.substack.com/p/lets-talcc-about-dicc-interview-with"
    class="post-preview-description"
    >of logs, girldick, male masochism, and a little aperçu about Lionel
    Trilling</a
  ><a
    href="https://grace.substack.com/p/lawfulness-and-freedom-the-hierophant"
    class="post-preview-title newsletter"
    >Lawfulness and Freedom: The Hierophant</a
  ><a
    href="https://grace.substack.com/p/lawfulness-and-freedom-the-hierophant"
    class="post-preview-description"
    >sex changes for spiritual guides</a
  ><a
    href="https://grace.substack.com/p/happy-womens-day"
    class="post-preview-title newsletter"
    >Happy Women’s Day</a
  ><a
    href="https://grace.substack.com/p/happy-womens-day"
    class="post-preview-description"
    >I am sick, but here is a picture of Emma Thompson</a
  ><a
    href="https://grace.substack.com/p/paul-simon-graceland-1986"
    class="post-preview-title newsletter"
    >Paul Simon, "Graceland" (1986). </a
  ><a
    href="https://grace.substack.com/p/paul-simon-graceland-1986"
    class="post-preview-description"
    >or, why I love trans men</a
  ><a
    href="https://grace.substack.com/p/fancy-candle-review-2-a-christmas"
    class="post-preview-title newsletter"
    >Fancy Candle Review #2: A Christmas Fantasia About Diptyque's "Pomander"</a
  ><a
    href="https://grace.substack.com/p/fancy-candle-review-2-a-christmas"
    class="post-preview-description"
    >I Bought the Wrong Fancy Candle and Now All You Bitches Have to Pretend
    It’s Christmas</a
  ><a
    href="https://grace.substack.com/p/after-shame"
    class="post-preview-title newsletter"
    >After Shame</a
  ><a
    href="https://grace.substack.com/p/after-shame"
    class="post-preview-description"
    >I don’t feel sad about being trans and I won’t pretend to</a
  ><a
    href="https://grace.substack.com/p/four-sonnets-about-the-l-word"
    class="post-preview-title newsletter"
    >Four Sonnets About the L Word</a
  ><a
    href="https://grace.substack.com/p/four-sonnets-about-the-l-word"
    class="post-preview-description"
    >the real "l word" is the "lyric I"</a
  ><a
    href="https://grace.substack.com/p/two-of-cups-savor-the-date"
    class="post-preview-title newsletter"
    >Two of Cups: Savor the Date</a
  ><a
    href="https://grace.substack.com/p/two-of-cups-savor-the-date"
    class="post-preview-description"
    >sexy times for young Lavery</a
  ><a
    href="https://grace.substack.com/p/questions-to-which-the-answer-is"
    class="post-preview-title newsletter"
    >Questions To Which the Answer Is “Chromosomes,” a Partial List</a
  ><a
    href="https://grace.substack.com/p/questions-to-which-the-answer-is"
    class="post-preview-description"
    >they formed you in the womb and they do not love you</a
  ><a
    href="https://grace.substack.com/p/bad-days"
    class="post-preview-title newsletter"
    >Bad Days</a
  ><a
    href="https://grace.substack.com/p/bad-days"
    class="post-preview-description"
    >On being soothed</a
  ><a
    href="https://grace.substack.com/p/a-man-is-ashamed-of-being-his-own"
    class="post-preview-title newsletter"
    >A Man Is Ashamed of Being His Own Wife</a
  ><a
    href="https://grace.substack.com/p/a-man-is-ashamed-of-being-his-own"
    class="post-preview-description"
    >a parable and a ficus</a
  ><a
    href="https://grace.substack.com/p/omg-thank-you"
    class="post-preview-title newsletter"
    >omg, thank you</a
  ><a
    href="https://grace.substack.com/p/omg-thank-you"
    class="post-preview-description"
    >thank u, not next</a
  ><a
    href="https://grace.substack.com/p/down-with-these-so-called-gender"
    class="post-preview-title newsletter"
    >Down With These So-Called “Gender Categories”!&nbsp;</a
  ><a
    href="https://grace.substack.com/p/down-with-these-so-called-gender"
    class="post-preview-description"
    >cuts in the past</a
  ><a
    href="https://grace.substack.com/p/a-womans-penis-is-in-the-home"
    class="post-preview-title newsletter"
    >A Woman’s Penis Is In the Home</a
  ><a
    href="https://grace.substack.com/p/a-womans-penis-is-in-the-home"
    class="post-preview-description"
    >in praise of the non-phallic penis</a
  ><a
    href="https://grace.substack.com/p/i-drew-a-dull-tarot-card-and-i-am"
    class="post-preview-title newsletter"
    >I Drew A Dull Tarot Card and I Am Going to Make a Big Fucking Deal of It</a
  ><a
    href="https://grace.substack.com/p/i-drew-a-dull-tarot-card-and-i-am"
    class="post-preview-description"
    >the fucking eight of pentacles, reversed</a
  ><a
    href="https://grace.substack.com/p/transsexual-tennis-heist-movie-treatment"
    class="post-preview-title newsletter"
    >Transsexual Tennis Heist Movie Treatment, List of Characters</a
  ><a
    href="https://grace.substack.com/p/transsexual-tennis-heist-movie-treatment"
    class="post-preview-description"
    >Change to Win!</a
  ><a
    href="https://grace.substack.com/p/what-sex-feels-like"
    class="post-preview-title newsletter"
    >What Sex Feels Like</a
  ><a
    href="https://grace.substack.com/p/what-sex-feels-like"
    class="post-preview-description"
    >t4t intimacy, a primer</a
  ><a
    href="https://grace.substack.com/p/the-stage-mirror-launches-tomorrow"
    class="post-preview-title newsletter"
    >The Stage Mirror launches tomorrow!</a
  ><a
    href="https://grace.substack.com/p/the-stage-mirror-launches-tomorrow"
    class="post-preview-description"
    >eek eek eek eek eek eek eek</a
  ><a
    href="https://grace.substack.com/p/angela-morley"
    class="post-preview-title newsletter"
    >Angela Morley</a
  ><a
    href="https://grace.substack.com/p/angela-morley"
    class="post-preview-description"
    >an aesthetics of lushness</a
  ><a
    href="https://grace.substack.com/p/ol-blue-eyes-drive-time-bangers"
    class="post-preview-title newsletter"
    >Ol’ Blue Eyes’ Drive-Time Bangers</a
  ><a
    href="https://grace.substack.com/p/ol-blue-eyes-drive-time-bangers"
    class="post-preview-description"
    >proposition: heterosexual men should not listen to Frank Sinatra while
    driving cars</a
  ><a
    href="https://grace.substack.com/p/fancy-fucking-smell-review-1-diptyque-0bd"
    class="post-preview-title newsletter"
    >Fancy Fucking Smell Review #1: Diptyque, "ORANGER"</a
  ><a
    href="https://grace.substack.com/p/fancy-fucking-smell-review-1-diptyque-0bd"
    class="post-preview-description"
    >the first in a possibly ongoing series of experiments to prove that I am a
    grown-up now</a
  ><a
    href="https://grace.substack.com/p/descartes-is-my-starfish"
    class="post-preview-title newsletter"
    >Descartes Is My Starfish</a
  ><a
    href="https://grace.substack.com/p/descartes-is-my-starfish"
    class="post-preview-description"
    >and there's a picture of a starfish</a
  ><a
    href="https://grace.substack.com/p/what-am-i-doing-at-my-age-with-my"
    class="post-preview-title newsletter"
    >What Am I Doing At My Age, With My Illnesses, Listening to Vampire
    Weekend?</a
  ><a
    href="https://grace.substack.com/p/what-am-i-doing-at-my-age-with-my"
    class="post-preview-description"
    >"jangle-jangle-Philip-Roth-reference"</a
  ><a
    href="https://grace.substack.com/p/stage-mirror-launch-details"
    class="post-preview-title newsletter"
    >Stage Mirror Launch Details</a
  ><a
    href="https://grace.substack.com/p/stage-mirror-launch-details"
    class="post-preview-description"
    >"raunchpad," as I used to call the pilot duck</a
  ><a
    href="https://grace.substack.com/p/things-i-learned-from-my-first-dog"
    class="post-preview-title newsletter"
    >Things I Learned From My First Dog, Murphy</a
  ><a
    href="https://grace.substack.com/p/things-i-learned-from-my-first-dog"
    class="post-preview-description"
    >who died this weekend</a
  ><a
    href="https://grace.substack.com/p/wilhelm-jensens-gradiva-1902"
    class="post-preview-title newsletter"
    >Wilhelm Jensen's "Gradiva" (1902).</a
  ><a
    href="https://grace.substack.com/p/wilhelm-jensens-gradiva-1902"
    class="post-preview-description"
    >archaeological desire and the transsexual retcon</a
  ><a
    href="https://grace.substack.com/p/select-your-first-tattoo-at-random"
    class="post-preview-title newsletter"
    >Select Your First Tattoo At Random, Almost</a
  ><a
    href="https://grace.substack.com/p/select-your-first-tattoo-at-random"
    class="post-preview-description"
    >don't overthink it</a
  ><a
    href="https://grace.substack.com/p/intimacies-i-would-be-prepared-to"
    class="post-preview-title newsletter"
    >Intimacies I Would Be Prepared To Entertain With Various Herbal Teas</a
  ><a
    href="https://grace.substack.com/p/intimacies-i-would-be-prepared-to"
    class="post-preview-description"
    >if I have to</a
  ><a
    href="https://grace.substack.com/p/george-sand-la-petite-fadette-1849"
    class="post-preview-title newsletter"
    >George Sand, "La Petite Fadette" (1849)</a
  ><a
    href="https://grace.substack.com/p/george-sand-la-petite-fadette-1849"
    class="post-preview-description"
    >fairy grammar for trans people</a
  ><a
    href="https://grace.substack.com/p/coming-soon"
    class="post-preview-title newsletter"
    >The Stage Mirror</a
  ><a
    href="https://grace.substack.com/p/coming-soon"
    class="post-preview-description"
    >Welcome to my newsletter, it is called the stage mirror but capitals</a
  ><a href="https://grace.substack.com/privacy" native="true">privacy</a
  ><a href="https://grace.substack.com/tos" native="true">terms</a
  ><a href="https://substack.com/ccpa#personal-data-collected" native="true"
    >information collection notice</a
  ><a href="https://substack.com/" native="true">Substack</a
  ><a href="https://grace.substack.com/privacy#cookies">privacy policy</a
  ><a href="https://enable-javascript.com/" target="_blank"
    >turn on JavaScript</a
  >
</div>
)

export default RegisterRoute;
