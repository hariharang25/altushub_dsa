//median - question
import java.util.*;
public class Main
{
	public static void main(String[] args) {
	    Scanner sc=new Scanner(System.in);
	    int n=sc.nextInt();
	    int k=sc.nextInt();
	    int[] arr=new int[n];
	    for(int i=0;i<n;i++)arr[i]=sc.nextInt();
	    
	    ArrayList<Integer> ans=new ArrayList<>();
	    for(int i=0;i<n;i++)
	    {
	        if(i+k<n)
	        {
	            int[] temp=new int[k];
	            int gg=0;
	            
	            for(int j=i;j<i+k;j++)
	            {
	                temp[gg]=arr[j];
	                gg++;
	            }
	            Arrays.sort(temp);
	            if(k%2==0)
	            {
	                
	                int ele1=temp[k/2];
	                int ele2=temp[(k/2)-1];
	                
	                ans.add((ele1+ele2)/2);
	            }
	            else{
	                
	                ans.add(temp[k/2]);
	            }
	        }
	    }
	    System.out.println(ans);
	}
    
}
