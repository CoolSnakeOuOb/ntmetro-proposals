document.addEventListener('DOMContentLoaded', () => {

    // 異步讀取外部的 proposals.json 檔案
    fetch('proposals.json')
        .then(response => response.json()) // 將回應的本文解析為 JSON
        .then(proposalData => {
            // 當 JSON 資料成功載入後，執行初始化應用程式的函式
            initializeApp(proposalData);
        })
        .catch(error => {
            // 如果讀取失敗，在控制台顯示錯誤訊息
            console.error('無法載入提案資料:', error);
        });

    // 將所有網頁互動的邏輯封裝在這個函式中
    function initializeApp(proposalData) {
        const modal = document.getElementById('proposal-modal');
        const closeButton = document.querySelector('.close-button');
        const proposalItems = document.querySelectorAll('.proposal-list li');
        
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        proposalItems.forEach(item => {
            item.addEventListener('click', () => {
                const proposalId = item.dataset.proposalId;
                const data = proposalData[proposalId]; // 從載入的資料中尋找對應的提案

                if (data) {
                    modalTitle.textContent = data.title;
                    modalBody.innerHTML = data.contentHTML;
                    
                    modal.classList.remove('hidden');
                } else {
                    console.error('在 proposals.json 中找不到提案資料：', proposalId);
                }
            });
        });

        function closeModal() {
            modal.classList.add('hidden');
        }

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});