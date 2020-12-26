import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'Basir',
          email: 'admin@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: true,
        },
        {
          name: 'John',
          email: 'user@example.com',
          password: bcrypt.hashSync('1234', 8),
          isAdmin: false,
        },
      ],
    internships:[
        {
            name:'Support Engineer Intern',
            image: '../images/micrologo1.jpg',
            company: 'Microsoft',
            location: 'Lisbon',
            candidates: '23',
            status: 'Open',
            type: 'Part-time',
            date:'3 days ago',
            description: 'Bla Bla Bla Bla',
        },
        {
            name:'Data Analyst Intern',
            image: '../images/amazon.png',
            company: 'Amazon',
            location: 'Porto',
            candidates: '123',
            status: 'Open',
            type: 'Part-time',
            date:'9 days ago',
            description: 'Bla Bla Bla Bla',
        },
        {
            name:'Bussiness Analyst Intern',
            image: '../images/cisco.jpeg',
            company: 'Cisco',
            location: 'Aveiro',
            candidates: '83',
            status: 'Open',
            type: 'Part-time',
            date:'2 weeks ago',
            description: 'Bla Bla Bla Bla Bla Bla Bla',
        },
        {
            name:'Strategic Sales Intern',
            image: '../images/google.png',
            company: 'Google',
            location: 'Faro',
            candidates: '13',
            status: 'Closed',
            type: 'Part-time',
            date:'2 months ago',
            description: 'Bla Bla Bla Bla Bla',
        },
        {
            name:'Project Manager Intern',
            image: '../images/sonae.png',
            company: 'Sonae',
            location: 'Lisbon',
            candidates: '43',
            status: 'Open',
            type: 'Part-time',
            date:'1 week ago',
            description: 'Bla Bla Bla Bla Bla',
        },
        {
            name:'RH Intern',
            image: '../images/NOS.png',
            company: 'NOS',
            location: 'Lisboa',
            candidates: '27',
            status: 'Closed',
            type: 'Part-time',
            date:'2 weeks ago',
            description: 'Bla Bla Bla ',
        },
    ]
}

export default data;