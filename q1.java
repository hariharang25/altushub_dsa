//merge k sorted list
import java.util.*;
public class Main
{
	public static void main(String[] args) {
	  Scanner sc=new Scanner(System.in);
		int n=sc.nextInt();
		int m=sc.nextInt();
		ArrayList<ArrayList<Integer>> li=new ArrayList<>();
		int[][] arr=new int[n][m];
		for(int i=0;i<n;i++)
		{
		    for(int j=0;j<m;j++)
		    {
		        arr[i][j]=sc.nextInt();
		    }
		}
		arr defined
		PriorityQueue<int[]> pq=new PriorityQueue<>((a,b)->a[0]-b[0]);
		for(int i=0;i<n;i++){
		    pq.add(new int[]{arr[i][0],i,0});
		}
		ArrayList<Integer> ans=new ArrayList<>();
		while(!pq.isEmpty())
		{
		    int[] curr=pq.poll();
		    ans.add(curr[0]);
		    int x=curr[1];
		    int y=curr[2];
		    if(y+1<m)
		    pq.add(new int[]{arr[x][y+1],x,y+1});
		}
		System.out.println(ans);
		
	}
}
