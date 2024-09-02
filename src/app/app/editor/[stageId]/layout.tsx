import AuthenticatedRoute from "@/app/app/(auth)/provider/authenticated-route";
import EditorNavigation from "./_components/navigation/editor-navigation";
import { getStageById } from "@/server/data/stage";
import ErrorPage from "@/app/_components/common/error-page";

type EditorLayoutProps = {
    params: {
        stageId: string;
    }
    children: React.ReactNode;
}

export default async function EditorLayout({ children, params }: EditorLayoutProps) {
    const { stageId } = params;
    const { dbStage } = await getStageById(stageId);
    if (!dbStage) {
        return <ErrorPage errorMessage='Unable to find stage' />
    }
    console.log(dbStage.name)
    return (
        <AuthenticatedRoute>
            <EditorNavigation 
            funnelId={dbStage.funnelId}
            stageName={dbStage.name}
            >
                {children}
            </EditorNavigation>
        </AuthenticatedRoute>
    );
}