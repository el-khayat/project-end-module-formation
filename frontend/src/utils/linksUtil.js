const linkHome ={
    name : 'home',
    path : '/',
    roles : ['admin','user']
}

const linkFormateurs ={
    name : 'Formateurs',
    path : '/formateurs',
    roles : ['ADMIN_ROLE','ASSISTANT_ROLE']
}

const linkFormations ={
    name : 'Formations',
    path : '/formations',
    roles : ['ADMIN_ROLE','ASSISTANT_ROLE']
}

const linkAssistant ={
    name : 'Assistant',
    path : '/assistant',
    roles : ['ADMIN_ROLE','ASSISTANT_ROLE']
}

const linkEnterprise ={
    name : 'Enterprise',
    path : '/Enterprise',
    roles : ['ADMIN_ROLE','ASSISTANT_ROLE']
}

const linkJoinUs ={
    name : 'Join Us',
    path : '/joinus',
    roles : ['ADMIN_ROLE','ASSISTANT_ROLE']
}
const linkCalendar ={
    name : 'Calendar',
    path : '/calendar',
    roles : ['ADMIN_ROLE','ASSISTANT_ROLE']
}

export function getLinksByRole(role){
    let links = [];
    switch (role) {
        case 'ADMIN_ROLE':
            links = [linkHome, linkFormateurs, linkFormations, linkAssistant, linkEnterprise,linkCalendar];
            break;
        case 'ASSISTANT_ROLE':
            links = [linkHome, linkFormateurs, linkFormations, linkEnterprise,linkCalendar];
            break;
        case 'user':
            links = [linkHome, linkJoinUs];
            break;
        default:
            links = [linkHome, linkJoinUs];
            break;
    }
    return links;
}