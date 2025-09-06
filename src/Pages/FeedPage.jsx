import { handleAllPostsAPI } from "../Services/postsServices";
import Post from "../Components/Post";
import LoadingPage from "./LoadingPage";
import CreatePost from "./../Components/PostComponents/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { Button, Spinner } from "@heroui/react";


export default function FeedPage() {


  const {data: allPosts,refetch,isFetching,isLoading,isError,error,} = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: handleAllPostsAPI,
    select: (data) => data?.data.posts,
    retry: 0,
    retryOnMount: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    // staleTime: 5000,
  });

  return (
    <>
      <div className='relative'>
        {isFetching && !isLoading && <Spinner className='fixed bg-gray-50 px-10 py-2 rounded-full shadow-2xl w-fit mx-auto start-0 end-0' />}
        <CreatePost reloadAllPosts={refetch} />
        {isLoading ? (
          <LoadingPage />
        ) : isError ? (
          !isFetching ? (
            <div>
              <h1 className='text-xl text-danger text-center pt-10 pb-4'>{error.message}</h1>
              <Button onPress={refetch} className='block mx-auto border-1 bg-gray-100 font-bold'>
                Retry
              </Button>
            </div>
          ) : (
            ""
          )
        ) : (
          allPosts?.map((post) => <Post key={post.id} post={post} commentsLimit={1} feedPage={true}/>)
        )}
      </div>
    </>
  );
}
