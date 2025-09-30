document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('submit-btn');
    const retryBtn = document.getElementById('retry-btn');
    const resultado = document.getElementById('result-message');


    const respostaCorreta = {
        q1: 'B',
        q2: 'E',
        q3: 'A',
        q4: 'C',
        q5: 'B',
        q6: 'A',
        q7: 'D',
        q8: 'C',
        q9: 'C',
        q10: 'A'
    };

    function tocarSom(arquivoSom) {
        const audio = new Audio(arquivoSom);
        audio.play();
    }

    submitBtn.addEventListener('click', () => {
        let score = 0;
        let questao = true;
        const formElements = quizForm.elements;

        resultado.textContent = '';
        resultado.className = '';

        document.querySelectorAll('.question-box').forEach(box => {
            box.style.border = '';
        });

        for (let i = 1; i <= 10; i++) {
            const questionName = `q${i}`;
            const respostaUsuario = formElements[questionName].value;
            const questionBox = document.querySelector(`.question-box:nth-of-type(${i})`);

            if (!respostaUsuario) {
                questao = false;
                break;
            }

            if (respostaUsuario === respostaCorreta[questionName]) {
                score++;
                questionBox.style.border = '2px solid #2ecc71';
            } else {
                questionBox.style.border = '2px solid #e74c3c';
            }
        }

        if (!questao) {
            resultado.textContent = 'Por favor, responda a todas as perguntas antes de enviar!';
            resultado.className = 'Falha';
            tocarSom('Sons/erro.mp3');
            return;
        }

        submitBtn.disabled = true;
        retryBtn.disabled = false;

        let message = '';
        let som = '';
        let pontuacao = '';

        if (score >= 0 && score <= 3) {
            message = `Sua pontuação foi ${score} de 10. Precisa melhorar! A Praga não foi gentil com você.`;
            som = 'Sons/falha-critica.mp3'; 
            pontuacao = 'falha';
        } else if (score >= 4 && score <= 6) {
            message = `Sua pontuação foi ${score} de 10. Você está no caminho certo, mas ainda tem muito a aprender sobre a Ilha.`;
            som = 'Sons/PoucosAcertos.mp3';
            pontuacao = 'baixa';
        } else if (score >= 7 && score <= 9) {
            message = `Sua pontuação foi ${score} de 10. Quase lá! Você é um verdadeiro veterano.`;
            som = 'Sons/PontuacaoAlta.mp3';
            pontuacao = 'alta';
        } else {
            message = `Sua pontuação foi ${score} de 10! Parabéns, você é um mestre de Dead Cells!`;
            som = 'Sons/PontuacaoPerfeita.mp3';
            pontuacao = 'perfeita';
        }

        resultado.textContent = message;
        resultado.className = pontuacao;
        tocarSom(som);
    });

    retryBtn.addEventListener('click', () => {
        quizForm.reset();
        resultado.textContent = '';
        resultado.className = '';
        submitBtn.disabled = false;
        retryBtn.disabled = true;

        document.querySelectorAll('.question-box').forEach(box => {
            box.style.border = '';
        });
    });
});