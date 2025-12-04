/**
 * Renders the video details
 * @param container
 * @param video
 */
export function renderVideoDetails(container, video) {
    container.innerHTML = `
    <div class="video-details">
      <img src="${video.thumbnail}" alt="${video.title}" class="detail-thumb">
      <h2>${video.title}</h2>
      <p class="detail-description">${video.description}</p>
      <p class="detail-price">Price: $${video.price}</p>
    </div>
  `;
}
