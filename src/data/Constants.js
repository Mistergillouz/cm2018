

const Constants = {
    
    BETS: {
        QUALIF: { key: 'QUALIF', title: 'Qualification', selectionCount: 16 },
        HUITIEME: { key: 'HUITIEME', title: 'Huitième', selectionCount: 8, finale: true },
        QUART: { key: 'QUART', title: 'Quart', selectionCount: 4, finale: true },
        DEMI: { key: 'DEMI', title: 'Demi Finale', selectionCount: 2, finale: true },
        FINALE: { key: 'FINALE', title: 'Finale', selectionCount: 1, finale: true },
        WINNER: { key: 'WINNER', title: 'Vainqueur', selectionCount: 0, finale: true }
    },

    GROUPS: {
        'A': [ 'RUS', 'URU', 'EGY', 'ARA' ],
        'B': [ 'POR', 'ESP', 'IRA', 'MAR' ],
        'C': [ 'FRA', 'PER', 'DAN', 'AUS' ],
        'D': [ 'ARG', 'CRO', 'ISL', 'NIG' ],
        'E': [ 'BRE', 'SUI', 'COS', 'SER' ],
        'F': [ 'ALL', 'MEX', 'SUE', 'COR' ],
        'G': [ 'BEL', 'ANG', 'TUN', 'PAN' ],
        'H': [ 'POL', 'COL', 'SEN', 'JAP' ]
    },

    COUNTRIES: {
        'RUS': 'Russie', 
        'URU': 'Uruguay', 
        'EGY': 'Egypte',
        'ARA': 'Arabie Saoudite',
        'POR': 'Portugal', 
        'ESP': 'Espagne', 
        'IRA': 'Iran',
        'MAR': 'Maroc',
        'FRA': 'France', 
        'PER': 'Pérou', 
        'DAN': 'Danemark',
        'AUS': 'Australie',
        'ARG': 'Argentine', 
        'CRO': 'Croatie', 
        'ISL': 'Islande',
        'NIG': 'Nigeria',
        'BRE': 'Brésil', 
        'SUI': 'Suisse', 
        'COS': 'Costa Rica', 
        'ALL': 'Allemagne', 
        'MEX': 'Mexique', 
        'SUE': 'Suède',
        'COR': 'Corée du Sud',
        'BEL': 'Belgique', 
        'ANG': 'Angleterre', 
        'TUN': 'Tunisie',
        'PAN': 'Panama',
        'POL': 'Pologne', 
        'COL': 'Colombie', 
        'SEN': 'Sénégal',
        'JAP': 'Japon',
        'SER': 'Serbie'
    },
    PAGES: { 'LOGIN': 'login', RESULTS: 'results', BETS: 'Bets', STATS: 'Stats' }

}

export default Constants