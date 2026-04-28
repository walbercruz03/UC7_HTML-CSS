const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjU0YmQ5OTBmMTE0NDM2NjYwZjY0MDdjNjE1MmFjYyIsInN1YnkiOiI2NjI2YTE1MGNmOTU4ZDAxMzM1YzFmZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S0zV7Wp-k8XvYy3v7_4y2WnS7m1-S4mS'; 

const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const responseArea = document.getElementById('responseArea');
const loading = document.getElementById('loading');

async function buscarFilmes(query = '') {
    loading.classList.remove('hidden');
    responseArea.classList.add('hidden');
    
    // CORREÇÃO AQUI: Variável escrita corretamente
    responseArea.innerHTML = '';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TOKEN}`
        }
    };

    let url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1';
    if (query.trim() !== '') {
        url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=pt-BR&page=1`;
    }

    try {
        const response = await fetch(url, options);
        
        if (response.status === 401) {
            throw new Error("Token expirado. Gere um novo no site TMDB.");
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            data.results.slice(0, 8).forEach(filme => { // Aumentei para 8 para preencher o grid
                const poster = filme.poster_path 
                    ? `https://image.tmdb.org/t/p/w500${filme.poster_path}` 
                    : 'https://via.placeholder.com/500x750?text=Sem+Foto';

                responseArea.innerHTML += `
                    <div class="movie-card">
                        <img src="${poster}" class="movie-poster">
                        <div class="movie-info">
                            <h2 class="movie-title">${filme.title}</h2>
                            <p class="movie-desc">
                                <strong>Nota:</strong> ⭐ ${filme.vote_average.toFixed(1)}<br>
                                ${filme.overview ? filme.overview.substring(0, 100) + '...' : 'Sinopse não disponível.'}
                            </p>
                            <a href="https://www.youtube.com/results?search_query=trailer+official+${encodeURIComponent(filme.title)}" 
                               target="_blank" class="btn-trailer">🎬 Ver Trailer</a>
                        </div>
                    </div>`;
            });
        } else {
            responseArea.innerHTML = "<div class='movie-card'><p style='padding:20px'>Nenhum filme encontrado.</p></div>";
        }
    } catch (err) {
        responseArea.innerHTML = `<div class='movie-card'><p style='padding:20px'>⚠️ ${err.message}</p></div>`;
    } finally {
        loading.classList.add('hidden');
        responseArea.classList.remove('hidden');
    }
}

// Eventos
sendBtn.addEventListener('click', () => buscarFilmes(userInput.value));
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') buscarFilmes(userInput.value); });

// Busca inicial
window.onload = () => buscarFilmes();