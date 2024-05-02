import React from 'react';

const Loader = () => {
  return (
  <div className='flex items-center h-screen justify-center align-center'>
    <div className="h-4 items-center  m-2 w-4 bg-primary rounded-full animate-three-bounce"  style={{ animationDelay: '0.1s' }}></div>
    <div className=" h-4 w-4 bg-primary m-2 rounded-full animate-three-bounce"  style={{ animationDelay: '0.3s' }}></div>
    <div className=" h-4 w-4 bg-primary rounded-full animate-three-bounce" style={{ animationDelay: '0.5s' }}></div>
  </div>
  );
};

export default Loader;
{/* <template>
  <div>
    <div class="h-4 w-4 bg-pink-600 rounded-full animate-three-bounce"></div>
    <div class=" h-4 w-4 bg-pink-600 rounded-full animate-three-bounce"></div>
    <div class=" h-4 w-4 bg-pink-600 rounded-full animate-three-bounce"></div>
  </div>
</template>

<style scoped lang="postcss">
.bounce {
  @apply h-4 w-4 bg-pink-600 rounded-full animate-three-bounce;
}

.bounce:nth-child(1) {
  animation-delay: 0.1s;
}

.bounce:nth-child(2) {
  animation-delay: 0.3s;
}

.bounce:nth-child(3) {
  animation-delay: 0.5s;
}
</style> */}